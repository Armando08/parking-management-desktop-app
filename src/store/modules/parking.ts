import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import moment from 'moment/moment'
import Handlebars from 'handlebars'
// import BrowserWindow = Electron.BrowserWindow;
/*eslint-disable */
// const { remote } = require('electron')
// const { BrowserWindow } = remote
const path = require('path')
const fs = require('fs')
/*eslint-enable */
const THREE_HOURS: number = 3 * 60 * 60 * 1000
const FOUR_HOURS: number = 4 * 60 * 60 * 1000
const FIVE_HOURS: number = 5 * 60 * 60 * 1000
const SIX_HOURS: number = 6 * 60 * 60 * 1000

const calculateFee = (durationInMilisec: number) => {
  let totalFee = 0

  if (durationInMilisec <= THREE_HOURS) {
    totalFee = 200
  } else if (durationInMilisec <= FOUR_HOURS) {
    totalFee = 300
  } else if (durationInMilisec <= FIVE_HOURS) {
    totalFee = 400
  } else if (durationInMilisec <= SIX_HOURS) {
    totalFee = 500
  } else {
    totalFee = 600
  }
  return totalFee
}
@Module({ namespaced: true })
class Parking extends VuexModule {
  public loginTime?: any = {}
  public checkoutDetails?: object | any
  public parkedCars: any = []
  public loggedUser?: any = ''
  public totalTurnover?: number = 0
  public users: any = {
    admin: {
      id: 1,
      username: 'admin',
      isLogged: false,
      password: 'admin',
    },

    user1: {
      username: 'user1',
      id: 2,
      password: 'user1',
      turnOverAmount: 0,
      isLogged: false,
    },
    user2: {
      username: 'user2',
      id: 3,
      password: 'user2',
      turnOverAmount: 0,
      isLogged: false,
    },
    user3: {
      username: 'user3',
      id: 4,
      password: 'user3',
      turnOverAmount: 0,
      isLogged: false,
    },
  }

  @Mutation
  SET_CAR_DETAILS(index: number) {
    const endTime: string = moment().format('DD/MM/YYYY HH:mm:ss')
    const endTimestamp: number = new Date().getTime()
    const startTime: number = this.parkedCars[index].currentTime
    const toDate: string = moment().format('YYYY-MM-DD')
    const id: number = this.parkedCars[index].id
    const user: any = this.loggedUser
    const startTimestamp: number = this.parkedCars[index].startTimestamp
    const differenceMs: number = moment(endTime, 'DD/MM/YYYY HH:mm:ss').diff(
      moment(startTime, 'DD/MM/YYYY HH:mm:ss')
    )
    const msDuration: any = moment.duration(differenceMs)
    const totalTime: any =
      Math.floor(msDuration.asHours()) + moment(differenceMs).format(':mm:ss')
    const totalAmount: number = calculateFee(endTimestamp - startTimestamp)

    this.checkoutDetails = {
      startTime: startTime,
      carPlate: this.parkedCars[index].plate,
      endTime: endTime,
      timeAmount: totalTime,
      totalClientAmount: totalAmount,
      tableIndex: index,
      startTimestamp: this.parkedCars[index].startTimestamp,
      id: id,
      endTimestamp,
      toDate,
      user,
    }
  }
  @Mutation
  REMOVE_PARKED_CAR() {
    this.parkedCars.splice(this.checkoutDetails.tableIndex, 1)
    this.checkoutDetails = {}
  }
  @Mutation
  TOTAL_TURNOVER(payload: any) {
    /*eslint-disable */
    this.users[this.loggedUser].turnOverAmount += payload.totalClientAmount
    /*eslint-enable*/
  }
  @Mutation
  ENTRY_INVOICE_PRINT(payload: any) {
    if (payload.plate === '') {
      alert('Ju lutem vendosni nje vlere')
      return
    }
    const duplicateCarPlate = this.parkedCars.filter(function(plate: any) {
      return payload.plate === plate.plate
    })

    payload.user = this.loggedUser

    if (duplicateCarPlate.length > 0) {
      alert('Kjo Targe Ekziston : \n \n' + payload.plate)
      return
    }
    this.parkedCars.push(payload)
    try {
      const data = {
        user: this.loggedUser,
        carPlate: payload.plate,
        startTime: payload.currentTime,
        id: payload.id,
      }

      const dirToCurrentPath = process.cwd()
      const file: string = path.resolve(dirToCurrentPath, 'print.html')
      let templateSource =
        process.env.ENTRY_INVOICE_TEMPLATE ||
        'C:\\parking\\entry_invoice_template.html'

      if (templateSource) {
        templateSource = fs.readFileSync(templateSource, 'utf8')
      } else {
        alert(' file print not found')
        return
      }
      const templateFn = Handlebars.compile(templateSource)

      const contentToPrint: string = templateFn(data)
      fs.writeFileSync(file, contentToPrint)

      //@-ts-ignore
      let winPrinter: any = new BrowserWindow({
        width: 800,
        height: 250,
        show: false,
      })
      winPrinter.once('ready-to-show', () => {
        winPrinter.hide()
      })
      winPrinter.loadURL('file:///' + file)
      winPrinter.webContents.on('did-finish-load', () => {
        winPrinter.webContents.print({
          silent: true,
        })
        setTimeout(() => {
          winPrinter.close()
          winPrinter = null
          fs.unlinkSync(file)
        }, 10000)
      })
    } catch (e) {
      console.log('Print Error', e)
    }
  }
  @Mutation
  EXIT_INVOICE_PRINT(payload: any) {
    const data = {
      user: this.loggedUser,
      carPlate: payload.carPlate,
      startTime: payload.startTime,
      endTime: payload.endTime,
      timeAmount: payload.timeAmount,
      totalAmount: payload.totalClientAmount,
      id: payload.id,
    }

    try {
      const dirToCurrentPath = process.cwd()
      const file: string = path.resolve(dirToCurrentPath, 'print.html')
      let templateSource =
        process.env.EXIT_INVOICE_TEMPLATE ||
        'C:\\parking\\exit_invoice_template.html'

      if (templateSource) {
        templateSource = fs.readFileSync(templateSource, 'utf8')
      } else {
        alert(' file print not found')
        return
      }
      const templateFn = Handlebars.compile(templateSource)

      const contentToPrint: string = templateFn(data)
      fs.writeFileSync(file, contentToPrint)

      let winPrinter = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
      })
      winPrinter.once('ready-to-show', () => {
        winPrinter.hide()
      })
      winPrinter.loadURL('file:///' + file)
      winPrinter.webContents.on('did-finish-load', () => {
        winPrinter.webContents.print({
          silent: true,
        })
        setTimeout(() => {
          winPrinter.webContents.print({
            silent: true,
          })
          setTimeout(() => {
            winPrinter.close()
            winPrinter = null
            fs.unlinkSync(file)
          }, 10000)
        }, 1000)
      })
    } catch (e) {
      console.log('print', e)
      alert(e)
    }
  }
  @Mutation
  SET_LOGGED_USER(username: string) {
    if (this.loggedUser) {
      this.users[this.loggedUser].turnOverAmount = 0
    }
    this.loggedUser = username
    alert(this.loggedUser)
  }
  @Mutation
  GET_TURNOVER_INVOICE(payload: any) {
    const data = {
      user: this.loggedUser,
      logoutTime: payload.leaveTime,
      totalTurnover: payload.turnover,
      loginTime: this.loginTime,
    }
    if (this.loggedUser === 'admin') {
      return
    }
    try {
      const dirToCurrentPath = process.cwd()
      const file: string = path.resolve(dirToCurrentPath, 'print.html')
      let templateSource =
        process.env.TOTAL_TURNOVER_TEMPLATE ||
        'C:\\parking\\total_turnover_template.html'

      if (templateSource) {
        templateSource = fs.readFileSync(templateSource, 'utf8')
      } else {
        alert(' file print not found')
        return
      }
      const templateFn = Handlebars.compile(templateSource)

      const contentToPrint: string = templateFn(data)
      fs.writeFileSync(file, contentToPrint)

      let winPrinter = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
      })
      winPrinter.once('ready-to-show', () => {
        winPrinter.hide()
      })
      winPrinter.loadURL('file:///' + file)
      winPrinter.webContents.on('did-finish-load', () => {
        winPrinter.webContents.print({
          silent: true,
        })
        setTimeout(() => {
          winPrinter.webContents.print({
            silent: true,
          })
          setTimeout(() => {
            winPrinter.close()
            winPrinter = null
            fs.unlinkSync(file)
          }, 10000)
        }, 1000)
      })
    } catch (e) {
      console.log('print', e)
      alert(e)
    }
  }

  @Action({ root: true, rawError: true })
  setCheckoutDetail(index: number) {
    this.context.commit('SET_CAR_DETAILS', index)
  }
  @Action({ root: true, rawError: true })
  async printEntryInvoice(data: any) {
    this.context.commit('ENTRY_INVOICE_PRINT', data)
  }
  @Action({ root: true, rawError: true })
  removeParkedCar(index: number) {
    this.context.commit('REMOVE_PARKED_CAR', index)
  }
  @Action({ root: true, rawError: true })
  printExitInvoice(payload: any) {
    this.context.commit('EXIT_INVOICE_PRINT', payload)
  }
  @Action({ root: true, rawError: true })
  totalTurnOver(payload: any) {
    this.context.commit('TOTAL_TURNOVER', payload)
  }
  @Action({ root: true, rawError: true })
  login(payload: any) {
    console.log(payload, 'store payloadd !!')
    // alert(111)
    // console.log(this.context.state.loginTime)
    // const { loginTime } = payload
    // this.loginTime = loginTime

    console.log(this.users, `pass check ?`)
    if (this.users[payload.email].password === payload.password) {
      alert('armando jemi in')
      return this.context.commit('SET_LOGGED_USER', payload.email)

    } else alert('Emri Ose Password Gabim !')
  }
  @Action({ root: true, rawError: true })
  logout() {
    this.context.commit('SET_LOGGED_USER', false)
    return true
  }
  @Action({ root: true, rawError: true })
  logoutReportInvoice(payload: any) {
    this.context.commit('GET_TURNOVER_INVOICE', payload)
  }

  get parkingList() {
    return this.parkedCars
  }
  get checkoutData() {
    return this.checkoutDetails
  }
  get dailyTotalTurnover() {
    console.log(this.users)
    if (this.loggedUser && this.users[this.loggedUser]) {
      return this.users[this.loggedUser].turnOverAmount
    }
    return 0
  }
  get getUser() {
    if (!this.loggedUser || this.loggedUser === '') {
      return false
    }
    return this.users[this.loggedUser]
  }
}
export default Parking
