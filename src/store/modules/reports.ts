import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

@Module({ namespaced: true })
class Reports extends VuexModule {
  filteredData?: any = []
  reportData?: any = []
  totalFilteredReport?: number | null = null
  totalParkedCars?: number | null = null

  @Mutation
  FILTER_REPORT_DATA(payload: any) {
    let totalReportAmount = 0
    this.filteredData = this.reportData.filter((report: any) => {
      if (!report.totalClientAmount) {
        return
      }

      const conditionCompleted =
        report.toDate >= payload.fromDate &&
        report.toDate <= payload.toDate &&
        report.user == payload.user

      if (conditionCompleted) {
        totalReportAmount += report.totalClientAmount
      }
      return conditionCompleted
    })
    filteredTotalCarParked = this.filteredData.length
    this.totalFilteredReport = totalReportAmount
    this.totalParkedCars = filteredTotalCarParked
  }

  @Action({ root: true, rawError: true })
  dailyReports(payload: any) {
    this.context.commit('REPORT_DATA', payload)
  }
  @Action({ root: true, rawError: true })
  filterReportData(payload: any) {
    this.context.commit('FILTER_REPORT_DATA', payload)
  }

  get getReportsData() {
    return this.filteredData
  }
  get getTotalFiltered() {
    return this.totalFilteredReport
  }
  get getTotalFilteredCars() {
    return this.totalParkedCars
  }
}

export default Reports
