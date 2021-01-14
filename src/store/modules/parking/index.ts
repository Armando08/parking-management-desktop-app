const moment = require('moment/moment')
const Handlebars = require('handlebars')
const { remote } = require('electron')
const { BrowserWindow } = remote

const THREE_HOURS = 3 * 60 * 60 * 1000
const FOUR_HOURS = 4 * 60 * 60 * 1000
const FIVE_HOURS = 5 * 60 * 60 * 1000
const SIX_HOURS = 6 * 60 * 60 * 1000

const feeCalculation = (durationInMilliseconds: number): void => {
  let totalInvoice: number = 0
  switch (totalInvoice) {
    case 200:
      durationInMilliseconds <= THREE_HOURS
      break
    case 300:
      durationInMilliseconds <= FOUR_HOURS
      break
    case 400:
      durationInMilliseconds <= FIVE_HOURS
      break
    case 500:
      durationInMilliseconds <= SIX_HOURS
      break
    default:
      totalInvoice = 600
  }
}

const state: any = {
  loginTime: null,
  parkedCars: [],
  checkoutDetail: {},
  loggedUser: '',
  totalTurnOver: 0,
  users: {
    admin: {
      id: 1,
      username: 'admin',
      is_logged: false,
      password: 'admin',
    },

    user1: {
      username: 'user1',
      id: 2,
      password: 'user1',
      turnOverAmount: 0,
      is_logged: false,
    },
    user2: {
      username: 'user2',
      id: 3,
      password: 'user2',
      turnOverAmount: 0,
      is_logged: false,
    },
    user3: {
      username: 'user3',
      id: 4,
      password: 'user3',
      turnOverAmount: 0,
      is_logged: false,
    },
  },
}

const mutations: object = {
  SET_CAR_DETAILS(state: any, payload: any) {
    const endTime = moment().format('DD/MM/YYYY HH:mm:ss')
    const endTimestamp = new Date().getTime()
    let startTime = state.parkedCars[payload].currentTime
    let toDate = moment().format('YYYY-MM-DD')
    const id = state.parkedCars[payload].id
    const user = state.loggedUser
    const startTimestamp = state.parkedCars[payload].startTimestamp
    let differenceMs = moment(endTime, 'DD/MM/YYYY HH:mm:ss').diff(
      moment(startTime, 'DD/MM/YYYY HH:mm:ss')
    )
    let msDuration = moment.duration(differenceMs)
    let totalTime =
      Math.floor(msDuration.asHours()) + moment(differenceMs).format(':mm:ss')
    let totalAmount = feeCalculation(endTimestamp - startTimestamp)

    state.checkoutDetail = {
      startTime: startTime,
      carPlate: state.parkedCars[payload].plate,
      endTime: endTime,
      timeAmount: totalTime,
      totalClientAmount: totalAmount,
      tableIndex: payload,
      startTimestamp: state.parkedCars[payload].startTimestamp,
      id: id,
      endTimestamp,
      toDate,
      user,
    }
  },
}
