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
  public loginTime?: string = ''
  public checkoutDetails?: object = {}
  public parkedCars: any = []
  public loggedUser?: any = ''
  public totalTurnover?: number = 0
  public users: any = {
    admin: {
      id: 1,
      username: 'ADMIN',
      isLogged: false,
      password: 'Admin@1234',
    },

    user1: {
      username: 'USER 1',
      id: 2,
      password: 'recepsion1',
      turnOverAmount: 0,
      isLogged: false,
    },
    user2: {
      username: 'USER 2',
      id: 3,
      password: 'recepsion2',
      turnOverAmount: 0,
      isLogged: false,
    },
    user3: {
      username: 'USER 3',
      id: 4,
      password: 'recepsion3',
      turnOverAmount: 0,
      isLogged: false,
    },
  }

  @Mutation
  SET_CAR_DETAILS(payload: any): void {
    const endTime: string = moment().format('DD/MM/YYYY HH:mm:ss')
    const endTimestamp: number = new Date().getTime()
    const startTime: number = this.parkedCars[payload].currentTime
    const toDate: string = moment().format('YYYY-MM-DD')
    const id: number = this.parkedCars[payload].id
    const user: any = this.loggedUser
    const startTimestamp: number = this.parkedCars[payload].startTimestamp
    const differenceMs: number = moment(endTime, 'DD/MM/YYYY HH:mm:ss').diff(
      moment(startTime, 'DD/MM/YYYY HH:mm:ss')
    )
    const msDuration: any = moment.duration(differenceMs)
    const totalTime: any =
      Math.floor(msDuration.asHours()) + moment(differenceMs).format(':mm:ss')
    const totalAmount: number = calculateFee(endTimestamp - startTimestamp)

    this.checkoutDetails = {
      startTime: startTime,
      carPlate: this.parkedCars[payload].plate,
      endTime: endTime,
      timeAmount: totalTime,
      totalClientAmount: totalAmount,
      tableIndex: payload,
      startTimestamp: this.parkedCars[payload].startTimestamp,
      id: id,
      endTimestamp,
      toDate,
      user,
    }
  }
  @Mutation
  REMOVE_PARKED_CAR(state: any) {
    this.parkedCars.splice(state.checkoutDetail.tableIndex, 1)
    this.checkoutDetails = {}
  }
  @Mutation
  TOTAL_TURNOVER(state: any, payload: any) {
    /*eslint-disable */
    this.users[this.loggedUser].turnOverAmount += payload.totalClientAmount
    /*eslint-enable*/
  }
  @Mutation
  ENTRY_INVOICE_PRINT(payload: any) {
    alert('Armandooo !')
    console.log(payload, `is thi sundefines !`)
    if (payload.plate === '') {
      alert('Ju lutem vendosni nje vlere')
      return
    }
    const dublicateCarPlate = this.parkedCars.filter(function(plate: any) {
      return payload.plate === plate.plate
    })

    payload.user = this.loggedUser

    if (dublicateCarPlate.length > 0) {
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
  // @Mutation
  // EXIT_INVOICE_PRINT(state: any, payload: any) {
  //   const data = {
  //     user: state.loggedUser,
  //     carPlate: payload.carPlate,
  //     startTime: payload.startTime,
  //     endTime: payload.endTime,
  //     timeAmount: payload.timeAmount,
  //     totalAmount: payload.totalClientAmount,
  //     id: payload.id,
  //   }
  //
  //   try {
  //     const dirToCurrentPath = process.cwd()
  //     const file: string = path.resolve(dirToCurrentPath, 'print.html')
  //     let templateSource =
  //       process.env.EXIT_INVOICE_TEMPLATE ||
  //       'C:\\parking\\exit_invoice_template.html'
  //
  //     if (templateSource) {
  //       templateSource = fs.readFileSync(templateSource, 'utf8')
  //     } else {
  //       alert(' file print not found')
  //       return
  //     }
  //     const templateFn = Handlebars.compile(templateSource)
  //
  //     const contentToPrint: string = templateFn(data)
  //     fs.writeFileSync(file, contentToPrint)
  //
  //     let winPrinter = new BrowserWindow({
  //       width: 800,
  //       height: 600,
  //       show: false,
  //     })
  //     winPrinter.once('ready-to-show', () => {
  //       winPrinter.hide()
  //     })
  //     winPrinter.loadURL('file:///' + file)
  //     winPrinter.webContents.on('did-finish-load', () => {
  //       winPrinter.webContents.print({
  //         silent: true,
  //       })
  //       setTimeout(() => {
  //         winPrinter.webContents.print({
  //           silent: true,
  //         })
  //         setTimeout(() => {
  //           winPrinter.close()
  //           winPrinter = null
  //           fs.unlinkSync(file)
  //         }, 10000)
  //       }, 1000)
  //     })
  //   } catch (e) {
  //     console.log('print', e)
  //     alert(e)
  //   }
  // }
  // @Mutation
  // SET_LOGGED_USER(state: any, payload: any) {
  //   if (state.loggedUser) {
  //     state.users[state.loggedUser].turnOverAmount = 0
  //   }
  //   state.loggedUser = payload
  // }
  // @Mutation
  // GET_TURNOVER_INVOICE(state: any, payload: any) {
  //   const data = {
  //     user: state.loggedUser,
  //     logoutTime: payload.leaveTime,
  //     totalTurnover: payload.turnover,
  //     loginTime: this.loginTime,
  //   }
  //   if (state.loggedUser === 'admin') {
  //     return
  //   }
  //   try {
  //     const dirToCurrentPath = process.cwd()
  //     const file: string = path.resolve(dirToCurrentPath, 'print.html')
  //     let templateSource =
  //       process.env.TOTAL_TURNOVER_TEMPLATE ||
  //       'C:\\parking\\total_turnover_template.html'
  //
  //     if (templateSource) {
  //       templateSource = fs.readFileSync(templateSource, 'utf8')
  //     } else {
  //       alert(' file print not found')
  //       return
  //     }
  //     const templateFn = Handlebars.compile(templateSource)
  //
  //     const contentToPrint: string = templateFn(data)
  //     fs.writeFileSync(file, contentToPrint)
  //
  //     let winPrinter = new BrowserWindow({
  //       width: 800,
  //       height: 600,
  //       show: false,
  //     })
  //     winPrinter.once('ready-to-show', () => {
  //       winPrinter.hide()
  //     })
  //     winPrinter.loadURL('file:///' + file)
  //     winPrinter.webContents.on('did-finish-load', () => {
  //       winPrinter.webContents.print({
  //         silent: true,
  //       })
  //       setTimeout(() => {
  //         winPrinter.webContents.print({
  //           silent: true,
  //         })
  //         setTimeout(() => {
  //           winPrinter.close()
  //           winPrinter = null
  //           fs.unlinkSync(file)
  //         }, 10000)
  //       }, 1000)
  //     })
  //   } catch (e) {
  //     console.log('print', e)
  //     alert(e)
  //   }
  // }
  // @Action
  // public setCheckoutDetail({ commit, state }: any, index: number) {
  //   this.context.commit('SET_CAR_DETAILS', index)
  // }
  @Action({ root: true, rawError: true })
  async printEntryInvoice(data: any) {
    this.context.commit('ENTRY_INVOICE_PRINT', data)
  }
  @Action
  removeParkedCar({ commit, state }: any, index: number) {
    this.context.commit('REMOVE_PARKED_CAR', index)
  }
  @Action
  printExitInvoice({ commit, state }: any, payload: any) {
    this.context.commit('EXIT_INVOICE_PRINT', payload)
  }
  @Action
  totalTurnOver({ commit, state }: any, payload: any) {
    commit('TOTAL_TURNOVER', payload)
  }
  @Action
  login({ commit, state }: any, payload: any) {
    this.loginTime = payload.loginTime
    if (state.users[payload.email].password === payload.password) {
      this.context.commit('SET_LOGGED_USER', payload.email)
      return true
    }
    alert('Emri Ose Password Gabim !')
    return false
  }
  @Action
  logout({ commit }: any) {
    this.context.commit('SET_LOGGED_USER', false)
    return true
  }
  @Action
  logoutReportInvoice({ commit, state }: any, payload: any) {
    this.context.commit('GET_TURNOVER_INVOICE', payload)
  }

  get parkingList() {
    return this.parkedCars
  }
  printEntryInvoices({ commit, state }: any, payload: any) {
    alert('mucekuuuuuuuuu')
    return commit('ENTRY_INVOICE_PRINT', payload)
  }
}
export default Parking
