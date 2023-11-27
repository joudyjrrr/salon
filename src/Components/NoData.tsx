import NODataIMG from "../assets/noData.jpg";

function NoData() {
  return (
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:'2rem' }}>
        <img src={NODataIMG} alt="NO Data Found" />
</div>

  )
}

export default NoData