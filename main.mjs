
//    
//const pool = new pg.Pool({
//  user: 'welllet',
//  host: 'localhost',
//  database: 'welllet',
//  password: 'oi9oityu',
//  port: 5433,
//})
//pool.query('insert into average_response_indicators (external_resource, average_access_time, average_page_size) values (\'qwe:rty\',123,123);', (err, res) => {
//  console.log(err, res)
//  pool.end()
//})
//const client = new pg.Client({
//  user: 'welllet',
//  host: 'localhost',
//  database: 'welllet',
//  password: 'oi9oityu',
//  port: 5433,
//})
//client.connect()
//client.query('SELECT * from average_response_indicators', (err, res) => {
//  console.log(err, res)
//  client.end()
//})
import {ResponseIndicatorDAO} from './DAO/ResponseIndicatorDAO.js';
import {AverageResponseIndicatorDAO} from './DAO/AverageResponseIndicatorDAO.js';
import {AverageResponseIndicator} from './DOM/AverageResponseIndicator.js';
import {Pinger} from './DOM/Pinger.js';
import {ExternalResource} from './DOM/ExternalResource.js';
import {XMLHttpRequest} from 'XMLHttpRequest';
import pg from 'pg';
import express from 'express';
function main(){

    
    let client = new pg.Client({
      user: 'username',
      host: 'localhost',
      database: 'dbname',
      password: 'password',
      port: 5433,
    })
    
    let averageResponseIndicatorDAO = new AverageResponseIndicatorDAO(client);
    let responseIndicator = new AverageResponseIndicator(111,222,"http://www.amazon.com");
    averageResponseIndicatorDAO.create(responseIndicator);

    
}

main();