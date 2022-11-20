export default function RightNav(props) {
  return (
    <div className="midBody">
      <ul className="midNav">
        <ul className="midNav__general">
          <li>Vandaag</li>
          <li>Alle deadlines</li>
          <li>Komende 7 dagen</li>
          <li>Komende 30 dagen</li>
        </ul>
        <ul className="midNav__classes">
          <li className="midNav__item">IDL V</li>
          <li className="midNav__item">CEC 1</li>
          <li className="midNav__item">BE 1</li>
          <li className="midNav__item">WBS 1</li>
          <li className="midNav__item">MSS 4</li>
        </ul>
      </ul>
      <MidNav />
    </div>
  );
}
