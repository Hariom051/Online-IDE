import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
 import {  onSnapshot } from "firebase/firestore";
export const AdminPanel = () => {
  const [state, setstate] = useState([]);
  const navigate = useNavigate();
  const [disable, setdisable] = useState(false);
  useEffect(() => {
const unsub = onSnapshot(doc(db, "admin", process.env.REACT_APP_ADMIN_KEY), (doc) => {
   if(!JSON.parse(doc.data()?.admincre?.active))
   {
    navigate("/adminlogin");
   }
});
    const gn = async () => {
      var array = [];
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        array.push({
          uid: doc.id,
          name: doc.data().user?.name,
          profile: doc.data().user?.profile,
          email: doc.data().user?.email,
          message: doc.data().user?.message,
        });
      });
      setstate(array);
    };
    gn();
  }, []);
  useEffect(() => {
  window.addEventListener('beforeunload', alertUser)
  return () => {
    window.removeEventListener('beforeunload', alertUser)
  }
}, [])
const alertUser = e => {
  e.preventDefault()
  e.returnValue = ''
}

  // console.log(state);
  const logout = async () => {
    setdisable(true);
    const docRef = doc(db, "admin", process.env.REACT_APP_ADMIN_KEY);
    await updateDoc(docRef, {
      "admincre.active": "false",
    });
    navigate("/adminlogin");
  };
  return (
    <>
      <h1 className="text-center alert-info ">Admin Control Panel </h1>
      <div className="">
        <table className="table table-success">
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {state?.map((e, index) => {
              if (e.name) {
                return (
                  <tr key={e.uid} className="table-info">
                    <td>{index + 1}</td>
                    <td style={{fontFamily:"helvetica"}}>
                      <img
                        style={{ height: "35px", borderRadius: "25px" }}
                        src={e.profile}
                        alt="Img"
                      />{" "}
                      {e.name}
                    </td>

                    <td>{e.email}</td>
                    <td>
                      {e.message?.map((e, index) => {
                        return <div key={index}>{e}</div>;
                      })}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <br />
        <br />
      </div>

      <footer
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "100%",
        }}
        className="footer mt-auto py-2 bg-dark"
      >
        <div className="container">
          <div className="row">
            <div className="col text-muted ">hariomarya305@gmail.com</div>
            <div className=" col ">
              <button
                disabled={disable}
                onClick={logout}
                className="col text btn btn-dark"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
