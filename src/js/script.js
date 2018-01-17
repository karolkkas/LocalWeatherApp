/* eslint-disable */
(function() {
    let loc, baseURL, appid, api, cTemp, currTemp, weatherType,
        currUnit = String.fromCharCode(176) + 'C',
        bgs = {
            day: {
                rain: 'https://images.unsplash.com/photo-1486016006115-74a41448aea2?auto=format&fit=crop&w=1494&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
                clouds: 'https://images.unsplash.com/photo-1505664762416-e21ed8b4a88e?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
                clear: 'https://images.unsplash.com/photo-1495469373168-c5bf3f5fd483?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
                thunderstorm: 'https://images.unsplash.com/photo-1457528877294-b48235bdaa68?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
                drizzle: 'https://images.unsplash.com/photo-1415347373860-1f2049f610ce?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
                snow: 'https://images.unsplash.com/photo-1468476775582-6bede20f356f?auto=format&fit=crop&w=1366&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
                mist: 'https://images.unsplash.com/photo-1489734379539-f769e5e98199?auto=format&fit=crop&w=1573&q=80',
                other: 'https://images.unsplash.com/photo-1418835817666-45fa43c32666?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'
            },
            night: {
                rain: 'https://images.unsplash.com/photo-1509375284720-881c0d6b2ead?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
                clouds: 'https://images.unsplash.com/photo-1479156661942-92cd989cdb56?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
                clear: 'https://images.unsplash.com/photo-1462651369841-9be325b94ade?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
                thunderstorm: 'https://images.unsplash.com/photo-1511149521648-612cb6799f07?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
                drizzle: 'https://images.unsplash.com/photo-1509375284720-881c0d6b2ead?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
                snow: 'https://images.unsplash.com/photo-1483623140147-ad127742fb01?auto=format&fit=crop&w=1525&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
                mist: 'https://images.unsplash.com/photo-1503745328377-1f4355a2284b?auto=format&fit=crop&w=1500&q=80',
                other: 'https://images.unsplash.com/photo-1501418611786-e29f9929fe03?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'
            }
        };

    function showSubWeather(e) {
        $('.sub__box').each(function(index) {
            const that = this;
            if (!$(that).hasClass('active-block')) {
                setTimeout(function() {
                    $(that).toggleClass('active-block');
                }, 0);
                setTimeout(function() {
                    $(that).toggleClass('collapse');
                },300 * (index + 1))
            } else {
                setTimeout(function() {
                    $(that).toggleClass('active-block');
                }, 1300);
                setTimeout(function() {
                    $(that).toggleClass('collapse');
                },300 * index);
            }
        });
        $(this).toggleClass('pulseAnimation')
    }

    function changeTempUnit(e) {
        let currUnit = $('.main__temp--unit').text();
            if (currUnit.includes('F')) {
                $('.main__temp--unit').text(String.fromCharCode(176) + 'C');
                currTemp = cTemp;
                $('.main__temp--value').text(currTemp)
            } else {
                $('.main__temp--unit').text(String.fromCharCode(176) + 'F');
                currTemp = (cTemp * 9 / 5 + 32).toFixed(1);
                $('.main__temp--value').text(currTemp)
            }
        e.stopPropagation();
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    function changeWeatherIcon(iconP) {
        return `http://openweathermap.org/img/w/${iconP}.png`
    };

    function changeBackground(type) {
        let now = new Date();
        let hours = now.getHours();
        if (hours >= 6 && hours <= 21) {
            (bgs.day[type]) ? $('body').css('background', `url(${bgs.day[type]})`) : $('body').css('background', `url(${bgs.day[other]})`);
        } else {
            (bgs.night[type]) ? $('body').css('background', `url(${bgs.night[type]})`) : $('body').css('background', `url(${bgs.night[other]})`);
        }
    };

    function getWeather() {
        $.ajax({
            url: baseURL,
            type: 'GET',
            dataType: 'JSON',
            data: {
                lat: loc.lat,
                lon: loc.lon,
                units: 'metric',
                appid: appid
            },
            success: function(json) {
                cTemp = (Math.round(json.main.temp * 10)/10).toFixed(1);
                weatherType = json.weather[0].main.toLowerCase();
                $('.main__city').text(`${json.name},`);
                $('.main__country').text(json.sys.country);
                $('.main__temp--value').text(cTemp);
                $('.main__temp--unit').text(currUnit);
                $('.main__icon').css(`background`, `url(${changeWeatherIcon(json.weather[0].icon)})`);
                $('.main__description').text(capitalizeFirstLetter(json.weather[0].description));
                $('#pressureValue').text(`${Math.round(parseInt(json.main.pressure))} hPa`);
                $('#humidityValue').text(`${parseInt(json.main.humidity)}%`);
                $('#windValue').text(`${Math.round(parseInt(json.wind.speed))} m/s`);
                $('#cloudsValue').text(`${parseInt(json.clouds.all)}%`);
                changeBackground(weatherType);
            },
            error: function() {
                alert('Bad request')
            }
        });
    };
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            loc = {
                lon: position.coords.longitude,
                lat: position.coords.latitude
            };
            baseURL = `https://api.openweathermap.org/data/2.5/weather?`;
            appid = '5afb2b52dd4f68f4bbdf01bc9e029c5d';
            getWeather();
        });
    } else {
        alert('Your browser do not support geolocation');
    }
    
    $('.main').click(showSubWeather);
    $('.main__temp--unit').click(changeTempUnit);

})();
