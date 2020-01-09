import express from 'express';
import db from '../database';
import List from '../models/list';
import ListItem from '../models/listItem';
import async from 'async';

 const router = express.Router();

 router.get('/', (req,res) => {

    let userLists = [];

    List.findAll().then(list => {

      async.each(list, function(item, callback) {

        ListItem.findAll({where: {list_id: item.id}}).then( listItems => {

          let userList = {
            list: item.dataValues,
            listItems: listItems
          }

          userLists.push(userList);

          callback();

        });
        
      }, function(err, results){

          res.json({lists: userLists});

      });
    
    }).catch(err=> console.log(err));

 });

 router.post('/', (req,res) => {

    console.log('works');
    res.status(200).json({code: 200});

});

 export default router;