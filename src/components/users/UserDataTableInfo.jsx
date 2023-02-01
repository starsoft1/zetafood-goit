import "./datatable.scss";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles({
  table: {
    width: '100%',
    margin: '0 auto',
    direction: 'rtl'
  },
  scrollableCell: {
    maxHeight: 200,
    overflowY: 'auto'
  }
});
const UserDataTableInfo = ({ userId }) => {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [customersList, setCustomersList] = useState([]);

  const getData = async () => {
    const docRef = doc(db, "users", userId);
    const snapshot = await getDoc(docRef);
    const item = snapshot.data().customerListByDay;
    console.log(item)
    setData(item);
  }
  const getCustomers = async () => {
    const userArray = [];
    const q = query(collection(db, "customers"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userArray.push({ uid: doc.id, name: doc.get("name") ,saleTarget: doc.get('saleTarget') });
    });
    setCustomersList(userArray);
  };

  useEffect(() => {
    getCustomers()
    getData()
  }, [userId]);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        الايام للمندوب المختار
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Customers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow >
                <TableCell>{item.day}</TableCell>
                <TableCell>
                  <div className={classes.scrollableCell}>
                    {/* {customersList.find((x) => x.uid === e).name } */}
                    {item.customers.map((e)=><div>{customersList.find((x) => x.uid === e).name??''}</div>)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};

export default UserDataTableInfo;