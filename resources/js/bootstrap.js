import "../css/bootstrap.css"

import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.start()

Alpine.data('app', function() {
  return {
    startWork: '',
    startBreak: '',
    endBreak: '',
    init() {
      this.loadTimes();
    },
    setCurrentTime(field) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      this[field] = `${hours}:${minutes}`;
      this.saveTimes();
    },
    saveTimes() {
      localStorage.setItem('startWork', this.startWork);
      localStorage.setItem('startBreak', this.startBreak);
      localStorage.setItem('endBreak', this.endBreak);
    },
    loadTimes() {
      this.startWork = localStorage.getItem('startWork') || '';
      this.startBreak = localStorage.getItem('startBreak') || '';
      this.endBreak = localStorage.getItem('endBreak') || '';
    },
    resetTimes() {
      this.startWork = '';
      this.startBreak = '';
      this.endBreak = '';
      localStorage.removeItem('startWork');
      localStorage.removeItem('startBreak');
      localStorage.removeItem('endBreak');
    },
    formatWithPad(number) {
      return String(number).padStart(2, '0')
    },
    get endTime() {
      console.clear()
      if (!this.startWork || !this.startBreak || !this.endBreak) {
        return 'Please fill in all fields';
      }

      const [startWorkHours, startWorkMinutes] = this.startWork.split(':').map(Number);
      const [startBreakHours, startBreakMinutes] = this.startBreak.split(':').map(Number);
      const [endBreakHours, endBreakMinutes] = this.endBreak.split(':').map(Number);

      const startBreakDate = new Date(0, 0, 0, startBreakHours, startBreakMinutes);
      const endBreakDate = new Date(0, 0, 0, endBreakHours, endBreakMinutes);

      const workDurationHours = 5;
      const workDurationMinutes = 45;
      console.log(`Duração de trabalho: ${this.formatWithPad(workDurationHours)}:${this.formatWithPad(workDurationMinutes)}`);

      const breakDurationMinutes = (endBreakDate - startBreakDate) / (1000 * 60);
      const breakDurationHours = Math.floor(breakDurationMinutes / 60);
      const breakDurationRemainingMinutes = breakDurationMinutes % 60;
      console.log(`Duração do intervalo: ${this.formatWithPad(breakDurationHours)}:${this.formatWithPad(breakDurationRemainingMinutes)}`);

      const totalWorkMinutes = workDurationMinutes + breakDurationRemainingMinutes;
      const totalWorkHours = workDurationHours + breakDurationHours + Math.floor(totalWorkMinutes / 60);
      const totalWorkRemainingMinutes = totalWorkMinutes % 60;
      console.log(`Total de trabalho necessário: ${this.formatWithPad(totalWorkHours)}:${this.formatWithPad(totalWorkRemainingMinutes)}`);

      const endTimeHours = startWorkHours + totalWorkHours + Math.floor((startWorkMinutes + totalWorkRemainingMinutes) / 60);
      const endTimeMinutes = (startWorkMinutes + totalWorkRemainingMinutes) % 60;
      console.log(`Horário iniciado: ${this.formatWithPad(startWorkHours)}:${this.formatWithPad(startWorkMinutes)}`);
      console.log(`Horário finalização: ${this.formatWithPad(endTimeHours)}:${this.formatWithPad(endTimeMinutes)}`);

      return `${this.formatWithPad(endTimeHours)}:${this.formatWithPad(endTimeMinutes)}`;
    }
  }
})
