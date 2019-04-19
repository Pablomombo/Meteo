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
                                        <p><span>Temp now: {{ y.main.temp }}</span></p>
                                        <p><span>{{ y.weather[0].description }}</span></p>
                                        <h1>{{ city }}</h1>
                                        <p><span>{{ todayDate }}</span></p>
                                        <p><span>Pressure: {{ y.main.pressure }}</span></p>
                                        <p><span>Humidity: {{ y.main.humidity + '%' }}</span></p>
                                        <p><span>Wind Speed: {{ y.wind.speed + 'm/s' }}</span></p>
                                        <p><span>Sea Level: {{ y.main.sea_level }}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-1 col-md-1 mr-3" v-for="(p, index) in listForecast" v-if="index <8" :key="p.id">
                            <div class="day" style="text-align: center;">
                                <div>{{ p.dt_txt }}</div>
                                <div><img v-bind:src= "'http://openweathermap.org/img/w/' + p.weather[0].icon + '.png'"></div>
                                <div>
                                    <p><span>max: {{ p.main.temp_max }}</span></p>
                                    <p><span>min: {{ p.main.temp_min }}</span></p>
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
            listForecast: '',
            icon:'',
            listForecastOneDay: ''
        }
    },
    methods: {  
        search(city) {
            let url = 'https://api.openweathermap.org/data/2.5/forecast?';
                url += 'APPID=3822751709a7f52738e88ffcd846f0a0';
                url += '&q=' + city; 
                url += '&units=metric';
          this.axios
                .get(url)
                .then(response => {
                    console.log(response);
                    // this.sunrise = new Date(response.data.list[0].sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,4);
                    // this.sunset = new Date(response.data.list[0].sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,4);
                    this.todayDate = moment().format('llll');
                    for (var i = 0; i < 4; i++) {
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
.container {
    margin-top: 20px;
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


