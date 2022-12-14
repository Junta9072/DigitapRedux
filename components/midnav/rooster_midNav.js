import { useEffect, useState } from "react";

export default function Rooster_MidNav() {
  return (
    <li>
      <ul className="midNav__rooster--preset">
        <h1>3 GDM IDL</h1>
        <li>Vandaag</li>
        <li>Deze week</li>
        <li>Deze Maand</li>
        <li>Komende 30 dagen</li>
      </ul>
      <br />
      <ul className="midNav__rooster--custom">
        <h1>2 GDM IDL</h1>
        <li>Vandaag</li>
        <li>Deze week</li>
        <li>Deze Maand</li>
        <li>Komende 30 dagen</li>
      </ul>
      <input type="text" placeholder="andere roosters" />
    </li>
  );
}
