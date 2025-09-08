import LogoutButton from "../components/LogoutButton";

export default function UserInfo({setPatientInfo}) {
  const user = localStorage.getItem("userName");
  return (

    <div className="container" style={{ marginTop: "-60px"}}>
      <h3 className="ms-3" style={{ color: "black" }}><strong>{user}</strong></h3>
      <LogoutButton setPatientInfo={setPatientInfo} />
    </div>
  );
}
