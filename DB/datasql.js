const DataSQL = {  
  // insert:'INSERT INTO data(uid,userName) VALUES(?,?)', 
  insert: 'INSERT INTO data (name,contact,updateTime,num) VALUES (?,?,?,?)',
  queryLimit:'SELECT * FROM data LIMIT ?,?',
  queryAll:'SELECT * FROM data',
  getUserById:'SELECT * FROM data WHERE uid = ?',
  getCount: 'SELECT count(*) count FROM data',
  queryLike: "SELECT * FROM data WHERE ?",
  deleteMin: "DELETE FROM data WHERE id NOT IN (SELECT minid FROM (SELECT MIN(id) AS minid FROM data GROUP BY name) b) AND num = ''",
  deleteMax: "DELETE FROM data WHERE id NOT IN (SELECT maxid FROM (SELECT MAX(id) AS maxid FROM data GROUP BY name) b) AND num = ''",
  queryRepeat: "SELECT * FROM data WHERE name IN (SELECT name FROM data GROUP BY name HAVING COUNT(name) > 1) AND num = ''",
  deleteNum: "DELETE FROM data WHERE id NOT IN (SELECT minid FROM (SELECT MIN(id) AS minid FROM data GROUP BY num) b) AND num != ''",
  batchInsert: "INSERT INTO data(name,contact,updateTime,num) VALUES ?",
  checkPwd:"SELECT * FROM user WHERE uploadPwd = ?"
}

module.exports = DataSQL;