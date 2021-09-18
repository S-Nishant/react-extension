import logo from './logo.svg';
import './App.css';
import MainDashboard from './component/MainDashboard';
import { db } from './firebase';
import { useEffect } from 'react';
import { collection,query, where, collectionGroup,getDocs } from 'firebase/firestore/lite';
function App() {
  useEffect(() => {
// console.log(getTodoList(db));
wherCla(db)
}, []);
async function getUsers(db) {
  const usersCol = collection(db, 'users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList;
}
async function wherCla(db){
  // var reference = db.collection("users").doc("hLUizMq2l7VhxFIH5XGf");  
const q = query(collection(db, "users"), where("emailId", "==", "s.nishant@aitglobalinc.com"));
const querySnapshot = await getDocs(q);

querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
}
async function getTodoList(db) {
  
  // const TodoListCol = collection(db, 'users');

  // const TodoListCol = collection(db, 'todoList')
  const TodoListCol = collectionGroup(db, 'todoList').where("user", "==", "hLUizMq2l7VhxFIH5XGf")
  //   .collection("todoList")
// .where("user", "==", "hLUizMq2l7VhxFIH5XGf")
  const TodoListSnapshot = await getDocs(TodoListCol).then(res=>{
    console.log('__Data___Arrived___Below__LOC:20__APP.JS___')
    let x = res.docs.map(doc => doc.data())
    console.log(x)
    console.log(x[0]['user']['id'])
  });
  // const TodoListList = TodoListSnapshot.docs.map(doc => doc.data());
  return TodoListSnapshot;
}
  return (
    <div className="App">
      <MainDashboard></MainDashboard>
    </div>
  );
}

export default App;
