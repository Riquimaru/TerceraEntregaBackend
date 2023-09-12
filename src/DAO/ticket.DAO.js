import { ticketModel } from "./models/ticket.model.js";

class TicketManager {
    constructor() {
      this.model = ticketModel;
    }
  
    async addTicket(ticket) {
      try {
        let data = await this.model.create(ticket);
        const response = JSON.parse(JSON.stringify(data));
        return response;
      } catch (error) {
        console.log(error.message);
        throw new Error(`Error creating new ticket : ${error.message}`);
      }
    }
  
    async getTickets() {
      try {
        const tickets = await this.model.find();
        const response = JSON.parse(JSON.stringify(tickets));
        return response;
      } catch (error) {
        throw new Error(`Error getting tickets: ${error.message}`);
      }
    }
  
    async getTicketById(ticketId) {
      try {
        const data = await this.model.findById(ticketId);
        const response = JSON.parse(JSON.stringify(data));
        return response;
      } catch (error) {
        throw new Error(`Error getting ticketId: ${error.message}`);
      }
    }
  
  }
  
  export default TicketManager;