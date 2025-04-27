
document.addEventListener('DOMContentLoaded', () => {
    i18next.init({
        lng: 'en',
        resources: {
            en: {
                translation: {
                    days: 'Days',
                    hours: 'Hours'
                }
            }
        }
    }, function (err, t) {
        document.getElementById('day').innerHTML = i18next.t('days');
    });
});



console.log(i18next.t('hours',{lng:'de'}));