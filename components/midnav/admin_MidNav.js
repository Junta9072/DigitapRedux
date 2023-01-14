import { useEffect, useState } from "react";
import styles from "../../styles/MidNav.module.css";

export default function Admin_MidNav(props) {
  return (
    <>
      <ul className={styles.vakken__general}>
        <li
          className={
            styles.vakken__item +
            "  " +
            styles.admin__item +
            " " +
            styles.vakken__active
          }
        >
          <i className={"material-icons-outlined " + styles.md24}>person</i>
          <span>Mijn dossier</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>
            account_balance_wallet
          </i>
          <span>leerkrediet raadplegen</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>source</i>
          <span>Studiematerialen</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>
            trending_up
          </i>
          <span>Opleidingsprogramma</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>
            assignment_ind
          </i>
          <span>Individueel rapport</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>newspaper</i>
          <span>Opleidingsmaterialen</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>
            pending_actions
          </i>
          <span>Voorlopige deelresultaten</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>summarize</i>
          <span>studieoverzicht</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>
            support_agent
          </i>
          <span>student center</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>
            markunread_mailbox
          </i>
          <span>E-postbus</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>
            no_accounts
          </i>
          <span>mijn afwezigheden</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>update</i>
          <span>registratie deelname tweede examenkans</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>
            assignment_ind
          </i>
          <span>individueel overzichtsrapport</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>
            screen_rotation_alt
          </i>
          <span>Aanvraag tot herorientering</span>
        </li>
        <li className={styles.vakken__item + "  " + styles.admin__item}>
          <i className={"material-icons-outlined " + styles.md24}>
            exit_to_app
          </i>
          <span>Aanvraag tot uitschrijven</span>
        </li>
      </ul>
    </>
  );
}
