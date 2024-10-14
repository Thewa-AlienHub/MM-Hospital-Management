// observers/AppointmentSubject.js

class AppointmentSubject {
    constructor() {
      this.observers = [];
    }
  
    // Add an observer to the list
    attach(observer) {
      this.observers.push(observer);
    }
  
    // Remove an observer from the list
    detach(observer) {
      this.observers = this.observers.filter((obs) => obs !== observer);
    }
  
    // Notify all observers of a change
    notify(data) {
      this.observers.forEach((observer) => observer.update(data));
    }

    // Change state and notify observers
    setState(state) {
        this.state = state;
        this.notify();
    }

    getState() {
        return this.state;
    }
  }
  
  export default AppointmentSubject;
  