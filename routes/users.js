var express = require('express');
var router = express.Router();
const files = require('fs');

/**
 * @openapi
 * /users:
 *   get:
 *     description: Get  All Employee Info
 *     responses:
 *       200:
 *         description: Get  Employee Info
 */
router.get('/',async function(req, res, next) {
  let value = await files.readFileSync('./EmployeeData.json','utf8');
  let json =  Array.from(JSON.parse(value.toString()));
  res.send(json)
});

/**
 * @openapi
 * /users/user/{id}:
 *   get:
 *     description: Get Particular  Employee Info
 *     parameters:
 *            - in: path
 *              name: id   # Note the name is the same as in the path
 *              required: true
 *              type: integer 
 *              minimum: 1
 *              description: The user ID.
 *     responses:
 *       200:
 *         description: Get  Particular Employee Info
 */
router.get('/user/:id',async function(req, res, next) {
  let value = await files.readFileSync('./EmployeeData.json','utf8');
  let json =  Array.from(JSON.parse(value.toString()));
  let userId = req.params.id;
  let getUserInfo = json.filter(x=>x.id==userId)
  if(getUserInfo.length>0){
    res.send(getUserInfo);  
    return;
  }
  res.send('userid is not available')
});


/**
 * @openapi
 * /users/addUser:
 *   post:
 *     description: Get Particular  Employee Info
 *     parameters:
 *            - in: body
 *              name: id   # Note the name is the same as in the path                        
 *              description: The user ID
 *              schema:
 *                type: object  
 *     responses:
 *       200:
 *         description: Get  Particular Employee Info
 */
router.post('/addUser', async (req, res, next)=>{
  let getUserInfo = req.body;
  var randomNumber = Math.floor(Math.random() * 100000) + 1
  let value = await files.readFileSync('./EmployeeData.json','utf8');
  let json =  Array.from(JSON.parse(value.toString()));
  while(json.filter(x=>x.id==randomNumber).length>0){
    randomNumber = Math.floor(Math.random() * 100000) + 1;
  }
  getUserInfo.id = randomNumber;
  json.push(getUserInfo);
  files.writeFileSync('./EmployeeData.json',JSON.stringify(json))
  res.send(`user created with id ${randomNumber}`)
})
module.exports = router;
