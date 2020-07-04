
const { getTripsRepository } = require('../repositories/trips')
const { getLogger } = require('../common/logger')

class TripsCtrl {
    constructor(req) {
        this.logger = getLogger('TripsCtrl')

        this.tripsRepo = getTripsRepository()
    }


    async createTrip(userId, tripData) {
        this.logger.info(`Handling. createTrip. userId : ${userId}`)

        return await this.tripsRepo.createTrip(userId, tripData)
    }

    async updateTripByUser(userId, tripId, data) {

        return await this.tripsRepo.updateTripByUser(userId, tripId, data)
    }

    async getTrip(tripId) {
        this.logger.info(`Handling. getTrip. trip_id : ${tripId}`)

        return await this.tripsRepo.getTrip(tripId)
    }

    async getUserTrips(userId, rules) {
        this.logger.info(`Handling. getUserTrips. userId : ${userId}`)

        return await this.tripsRepo.getUserTrips(userId, rules)
    }

    async deleteTrip(tripId) {
        this.logger.info(`Handling. deleteTrip. trip_id : ${tripId}`)

        return await this.tripsRepo.deleteTrip(tripId)
    }

    async getTrips(userId, rules) {
        this.logger.info(`Handling. getTrips, rules: ${JSON.stringify(rules)}`)

        return await this.tripsRepo.getTrips(userId, rules)
    }
}

module.exports = {
    getTripsController: (req) => new TripsCtrl(req)
}
