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
    calculateBreakDuration() {
      if (!this.startBreak || !this.endBreak) return '';
      const [startBreakHours, startBreakMinutes] = this.startBreak.split(':').map(Number);
      const [endBreakHours, endBreakMinutes] = this.endBreak.split(':').map(Number);
      const startBreakDate = new Date(0, 0, 0, startBreakHours, startBreakMinutes);
      const endBreakDate = new Date(0, 0, 0, endBreakHours, endBreakMinutes);
      const breakDurationMinutes = (endBreakDate - startBreakDate) / (1000 * 60);
      const breakDurationHours = Math.floor(breakDurationMinutes / 60);
      const breakDurationRemainingMinutes = breakDurationMinutes % 60;
      return `${String(breakDurationHours).padStart(2, '0')}:${String(breakDurationRemainingMinutes).padStart(2, '0')}`;
    },
    calculateReturnTime() {
      if (!this.startBreak) return '';
      const [startBreakHours, startBreakMinutes] = this.startBreak.split(':').map(Number);
      const returnTime = new Date(0, 0, 0, startBreakHours, startBreakMinutes + 15);
      const returnHours = String(returnTime.getHours()).padStart(2, '0');
      const returnMinutes = String(returnTime.getMinutes()).padStart(2, '0');
      return `${returnHours}:${returnMinutes}`;
    },
    get endTime() {
      console.clear();
      if (!this.startWork) {
        return 'Please fill in the start work time';
      }

      const [startWorkHours, startWorkMinutes] = this.startWork.split(':').map(Number);

      const workDurationHours = 5;
      const workDurationMinutes = 45;
      const breakDurationMinutes = 15;
      const totalWorkMinutes = workDurationMinutes + breakDurationMinutes;
      const totalWorkHours = workDurationHours + Math.floor(totalWorkMinutes / 60);
      const totalWorkRemainingMinutes = totalWorkMinutes % 60;

      let logData = {
        'Duração do Trabalho': `${workDurationHours} hours and ${workDurationMinutes} minutes`,
        'Duração do Intervalo': 'N/A',
        'Duração Total Necessária do Trabalho': `${totalWorkHours} hours and ${totalWorkRemainingMinutes} minutes`,
        'Horário de Início Fornecido': `${String(startWorkHours).padStart(2, '0')}:${String(startWorkMinutes).padStart(2, '0')}`,
        'Horário Calculado de Saída': 'N/A'
      };

      if (!this.startBreak || !this.endBreak) {
        const endTimeHours = startWorkHours + totalWorkHours + Math.floor((startWorkMinutes + totalWorkRemainingMinutes) / 60);
        const endTimeMinutes = (startWorkMinutes + totalWorkRemainingMinutes) % 60;
        logData['Horário Calculado de Saída'] = `${String(endTimeHours).padStart(2, '0')}:${String(endTimeMinutes).padStart(2, '0')}`;
        console.table(logData);
        return `Estimated end time: ${String(endTimeHours).padStart(2, '0')}:${String(endTimeMinutes).padStart(2, '0')}`;
      }

      const [startBreakHours, startBreakMinutes] = this.startBreak.split(':').map(Number);
      const [endBreakHours, endBreakMinutes] = this.endBreak.split(':').map(Number);

      const startBreakDate = new Date(0, 0, 0, startBreakHours, startBreakMinutes);
      const endBreakDate = new Date(0, 0, 0, endBreakHours, endBreakMinutes);

      const breakDurationMinutesActual = (endBreakDate - startBreakDate) / (1000 * 60);
      const breakDurationHoursActual = Math.floor(breakDurationMinutesActual / 60);
      const breakDurationRemainingMinutesActual = breakDurationMinutesActual % 60;

      const totalWorkMinutesActual = workDurationMinutes + breakDurationRemainingMinutesActual;
      const totalWorkHoursActual = workDurationHours + breakDurationHoursActual + Math.floor(totalWorkMinutesActual / 60);
      const totalWorkRemainingMinutesActual = totalWorkMinutesActual % 60;

      const endTimeHoursActual = startWorkHours + totalWorkHoursActual + Math.floor((startWorkMinutes + totalWorkRemainingMinutesActual) / 60);
      const endTimeMinutesActual = (startWorkMinutes + totalWorkRemainingMinutesActual) % 60;

      logData['Duração do Intervalo'] = `${breakDurationHoursActual} hours and ${breakDurationRemainingMinutesActual} minutes`;
      logData['Duração Total Necessária do Trabalho'] = `${totalWorkHoursActual} hours and ${totalWorkRemainingMinutesActual} minutes`;
      logData['Horário Calculado de Saída'] = `${String(endTimeHoursActual).padStart(2, '0')}:${String(endTimeMinutesActual).padStart(2, '0')}`;

      console.table(logData);

      return `${String(endTimeHoursActual).padStart(2, '0')}:${String(endTimeMinutesActual).padStart(2, '0')}`;
    }
  }
})
