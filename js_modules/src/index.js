//before babel
//const sum = require('./sum');

//after babel
/**import sum from './sum';
import './image_viewer';
const total = sum(10,5);

console.log(total);**/

const button = document.createElement('button');

button.innerText = 'Click me';

button.onclick= ()=>{
    System.import('./image_viewer')
        .then(module=>{
            console.log(module);
            
        })
}

document.body.appendChild(button);