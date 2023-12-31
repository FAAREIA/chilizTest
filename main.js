/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 * 
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
*/
const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];

// Receive string of dates one after each other
function outputDate(dates) {
    // millisecondsPerDay and all the following methods
    // should have been created outside this function
    // I just did it this way to follow the instructions

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const getDate = ddmmyyyy => {
        const [day, month, year] = ddmmyyyy.split('.');
        return new Date(`${year}, ${month}, ${day}`);
    }

    const getDaysBetweenDates = (initialDate, finalDate) => {
        const finalTime = finalDate.getTime();
        const initialTime = initialDate.getTime();

        const daysBetweenDates = Math.round((finalTime - initialTime) / millisecondsPerDay);
        const noun = daysBetweenDates === 1 ? 'day' : 'days';

        return `total ${daysBetweenDates} ${noun}`;
    }

    const getMonthsBetweenDates = (initialDate, finalDate) => {
        const finalMonth = finalDate.getMonth();
        const initialMonth = initialDate.getMonth();
        const isInitialMonthGreater = initialMonth > finalMonth;
        const monthDifference = initialDate.getDate() > finalDate.getDate() ? -1 : 0;

        const monthsBetweenDates = isInitialMonthGreater ? 11 - initialMonth + finalMonth + 1 + monthDifference : finalMonth - initialMonth + monthDifference;
        const noun = monthsBetweenDates === 1 ? 'month' : 'months';

        return monthsBetweenDates ? `${monthsBetweenDates} ${noun}` : null ;
    }

    const getYearsBetweenDates = (initialDate, finalDate) => {
        const finalYear = finalDate.getFullYear();
        const initialYear = initialDate.getFullYear();

        const fullYearsBetweenDates = finalYear - initialYear;
        const initialToFinalDate = new Date(initialDate.getTime());

        initialToFinalDate.setFullYear(initialToFinalDate.getFullYear() + fullYearsBetweenDates);

        const yearDifference = initialToFinalDate.getTime() > finalDate.getTime() ? -1 : 0;
        const yearsBetweenDates = fullYearsBetweenDates + yearDifference;
        const noun = yearsBetweenDates === 1 ? 'year' : 'years';

        return yearsBetweenDates ? `${yearsBetweenDates} ${noun}` : null;
    }

    const [initialDate, finalDate] = dates.map(getDate);

    const daysBetweenDates = getDaysBetweenDates(initialDate, finalDate);
    const monthsBetweenDates = getMonthsBetweenDates(initialDate, finalDate);
    const yearsBetweenDates = getYearsBetweenDates(initialDate, finalDate);

    const answers = [];

    if (yearsBetweenDates) answers.push(yearsBetweenDates);
    if (monthsBetweenDates) answers.push(monthsBetweenDates);
    answers.push(daysBetweenDates);

    return answers.join(', ');
}
