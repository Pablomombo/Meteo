<template>
    <div id="weather">
        <div class="row" style="background-color: white;">
            <div class="col-md-6">
                <h1>Prévision de la météo</h1>
            </div>
            <div class="col-md-6" style="text-align: right; padding-top: 10px;">
                <input type="text" class="weather" placeholder="look for a city" v-model="city"  @keyup.enter="search(city)">
                <button type="submit" @click="search(city)">Submit</button>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="offset-1 col-md-10 mb-4">
                            <div class="today" style="text-align: center;">
                                <div v-for="(y, index) in listForecast" v-if="index %40===0" :key="y.id">
                                    <div><img v-bind:src= "'http://openweathermap.org/img/w/' + y.weather[0].icon + '.png'" style="width:200px;height:200px;"></div>
                                    <div>
                                        <p>Temp now: <span>{{ y.main.temp }}</span></p>
                                        <p><span>{{ y.weather[0].description }}</span></p>
                                        <h1>{{ city }}</h1>
                                        <p><span>{{ todayDate }}</span></p>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <p>Pressure: <span>{{ y.main.pressure }}</span></p>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Humidity: <span>{{ y.main.humidity + '%' }}</span></p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <p>Wind Speed: <span>{{ y.wind.speed + 'm/s' }}</span></p>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Sea Level: <span>{{ y.main.sea_level }}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-1 col-md-1 mr-3" v-for="(p, index) in listForecast" v-if="index <8" :key="p.id">
                            <div class="day" style="text-align: center;">
                                <div>{{ p.dt_txt.slice(-8, -3) }}</div>
                                <div><img v-bind:src= "'http://openweathermap.org/img/w/' + p.weather[0].icon + '.png'"></div>
                                <div>
                                    <p>max: <span>{{ p.main.temp_max }}</span></p>
                                    <p>min: <span>{{ p.main.temp_min }}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="col-md-6">
                    <div class="row">
                        <div class="offset-1 col-md-10">
                            <div class="week" style="text-align: center;">
                                <div v-for="(x, index) in listForecast" v-if="index %8===0" :key="x.id">
                                    <div class="row">
                                        <div class="col-4">
                                            <h4>{{ date }}</h4>
                                        </div>    
                                        <div class="col-4">
                                            <img v-bind:src= "'http://openweathermap.org/img/w/' + x.weather[0].icon + '.png'">
                                        </div>
                                        <div class="col-4">
                                          <p><span>max: {{ x.main.temp_max }}</span></p>
                                          <p><span>min: {{ x.main.temp_min }}</span></p>   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import 'moment-timezone'

export default {
    name: 'Weather',
    data () {
        return {
            city: '',
            date: '',
            todayDate: '',
            listForecast: ''
        }
    },
    methods: {
        getWeekDay(date) {
            //Create an array containing each day, starting with Sunday.
            var weekdays = new Array(
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
            //Use the getDay() method to get the day.
            var day = date.getDay();
            //Return the element that corresponds to that index.
            return weekdays[day];
        },
        search(city) {
            let url = 'https://api.openweathermap.org/data/2.5/forecast?';
                url += 'APPID=3822751709a7f52738e88ffcd846f0a0';
                url += '&q=' + city; 
                url += '&units=metric';
          this.axios
                .get(url)
                .then(response => {
                    console.log(response);
                    this.todayDate = moment().format('llll');
                    this.date = '';
                    for (var i = 1; i < 6; i++) {
                        this.date = moment().add(i, 'days').format('dddd');
                        console.log(this.date);
                    }
                    this.listForecast = response.data.list;
                    this.icon = "'../src/assets/img/' + list[0].weather[0].icon + '.png'";
                    console.log(this.icon);
                })
        },
    }
}
</script>

<style>
#weather {
    width: 100%;
    height: auto;
}
body {
    background-color: cadetblue;
}
/*Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday*/
.container {
    margin-top: 20px;
}
span {
    font-weight: bold;
}
/*h1 {
    text-align: center;
}*/
.todo {
    /*width: 100%;
    padding: 10px 18px;*/
    font-size: 18px;
    margin-bottom: 16px;
}
.wrapper{
    width: 500px;
}
.first{
    width: 250px;
}
.second{
    width:250px;
}

/*.row {
    border: 2px red solid;
}
.todo-item {
    font-size: 22px;
}
.remove {
    cursor: pointer;
    margin-left: 14px;
}
.completed {
    text-decoration: line-through;
    color: black;
}
.all {
    padding-top: 10px;
    border-top: 1px solid grey;
}*/
</style>


