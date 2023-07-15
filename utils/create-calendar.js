/** 
* createCalendar genera los slots para pintar un diagrama del calendario
* si recibe informacion de un calendario o citas, lo indica en el campo isOpen and isBooked
* @param {*} startHour 
* @param {*} endHour 
* @returns 
*/
function createCalendar(calendarData, startHour = 0, endHour = 24) {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const data = {
    rows: []
  };
  for (let i = startHour; i < endHour; i++) {
    let cols = []
    for (let j = 0; j < weekDays.length; j++) {
      const  day = calendarData && calendarData.days.filter(d => d.day === weekDays[j])
      const [{ openTimeBlocks, appointments }] = (day && day.length > 0) ? day : [{ openTimeBlocks: [], appointments: [] } ]
      const isOpen = openTimeBlocks && openTimeBlocks.includes(i)
      console.log('day: ', day);
      // console.log('openTimeBlocks: ', openTimeBlocks);
      // console.log('isOpen: ', isOpen);
      // we summarize all the appointments of the day, and
      const isBooked = appointments && appointments.flatMap(a => a.scheduledTimeBlocks).includes(i)
      console.log('appointments: ', appointments);
      console.log('isBooked: ', isBooked);
      
      cols.push({
        // revisamos si ya estaba abierto ese horario o si ya habia una reservacion 
        isOpen,
        isBooked,
        day: weekDays[j],
        hour: i
      })
    }
    data.rows.push({
      hour: i, // guardamos aca tambien las horas para mostralas en el formulario (las horas que se guardan aca son las que aparecen en el formulario)
      cols
    })      
  }
  return data;


}

module.exports = createCalendar;