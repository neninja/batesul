import "../css/bootstrap.css"

import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.start()

Alpine.data('app', function() {
  return {
    inicioExpediente: '',
    inicioIntervalo: '',
    finalIntervalo: '',
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
      localStorage.setItem('inicioExpediente', this.inicioExpediente);
      localStorage.setItem('inicioIntervalo', this.inicioIntervalo);
      localStorage.setItem('finalIntervalo', this.finalIntervalo);
    },
    loadTimes() {
      this.inicioExpediente = localStorage.getItem('inicioExpediente') || '';
      this.inicioIntervalo = localStorage.getItem('inicioIntervalo') || '';
      this.finalIntervalo = localStorage.getItem('finalIntervalo') || '';
    },
    resetTimes() {
      this.inicioExpediente = '';
      this.inicioIntervalo = '';
      this.finalIntervalo = '';
      localStorage.removeItem('inicioExpediente');
      localStorage.removeItem('inicioIntervalo');
      localStorage.removeItem('finalIntervalo');
    },
    get horarioParaSair() {
      if (!this.inicioExpediente || !this.inicioIntervalo || !this.finalIntervalo) {
        return 'Preencha todos os campos';
      }

      const [inicioExpedienteHours, inicioExpedienteMinutes] = this.inicioExpediente.split(':').map(Number);
      const [inicioIntervaloHours, inicioIntervaloMinutes] = this.inicioIntervalo.split(':').map(Number);
      const [finalIntervaloHours, finalIntervaloMinutes] = this.finalIntervalo.split(':').map(Number);

      const inicioExpedienteDate = new Date(0, 0, 0, inicioExpedienteHours, inicioExpedienteMinutes);
      const inicioIntervaloDate = new Date(0, 0, 0, inicioIntervaloHours, inicioIntervaloMinutes);
      const finalIntervaloDate = new Date(0, 0, 0, finalIntervaloHours, finalIntervaloMinutes);

      const workDuration = 5 * 60 + 45; // 5 hours and 45 minutes in minutes
      const intervaloDuration = (finalIntervaloDate - inicioIntervaloDate) / (1000 * 60); // Interval duration in minutes

      const totalMinutes = workDuration + intervaloDuration;
      const endTime = new Date(inicioExpedienteDate.getTime() + totalMinutes * 60 * 1000);

      const hours = String(endTime.getHours()).padStart(2, '0');
      const minutes = String(endTime.getMinutes()).padStart(2, '0');

      return `${hours}:${minutes}`;
    }
  }
})
