import React, { useState } from "react";
import "../Pages.css";
import useFormContext from "../hooks/useFormContext";

const FormPeople = () => {
  const { data, handleChange, setData } = useFormContext();

  return (
    <div className="personal-form">
      <div className="form-info-suggestion insert-animation">
        Bine te-am gasit! Pe aceasta pagina poti sa faci comanda de o surpriza
        pentru persoana ta draga. Completeaza fiecare camp cu informatiile
        necesare.
      </div>
      <div className="line-form"></div>
      <div className="forms">
        <div className="destinatar">
          <h2>Pentru cine este surpriza?</h2>
          <div className="name-surname">
            <div className="inherit-width">
              <label htmlFor="receiverFirstName">Prenume:</label>
              <input
                type="text"
                id="receiverFirstName"
                name="receiverFirstName"
                value={data.receiverFirstName}
                // onChange={(e) => setFirstName(e.target.value)}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inherit-width">
              <label className="second-label" htmlFor="receiverLastName">
                Nume:
              </label>
              <input
                type="text"
                id="receiverLastName"
                name="receiverLastName"
                value={data.receiverLastName}
                // onChange={(e) => setLastName(e.target.value)}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="name-surname">
            <div className="inherit-width">
              <label htmlFor="receiverBirthdate">Data nasterii:</label>
              <input
                type="date"
                id="receiverBirthdate"
                name="receiverBirthdate"
                value={data.receiverBirthdate}
                onChange={handleChange}
                placeholder="dd-mm-yyyy"
                locale="ro"
                required
              />
            </div>

            <div className="inherit-width">
              <label className="second-label" htmlFor="receiverGender">
                Genul:
              </label>
              <select
                id="receiverGender"
                onChange={handleChange}
                value={data.gender}
                name="receiverGender"
                required
              >
                <option value="male">Masculin</option>
                <option value="female">Feminin</option>
                <option value="other">Altul</option>
              </select>
            </div>
          </div>
        </div>
        <div className="expeditor">
          <h2>De la cine este surpriza?</h2>
          <div className="name-surname">
            <div className="inherit-width">
              <label htmlFor="senderFirstName">Prenume:</label>
              <input
                type="text"
                id="senderFirstName"
                name="senderFirstName"
                value={data.senderFirstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inherit-width">
              <label className="second-label" htmlFor="senderLastName">
                Nume:
              </label>
              <input
                type="text"
                id="senderLastName"
                name="senderLastName"
                value={data.senderLastName}
                // onChange={(e) => setLastName(e.target.value)}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="name-surname ">
            <div className="inherit-width ">
              <label htmlFor="senderCountry">In ce tara va aflati?</label>
              <select
                id="senderCountry"
                name="senderCountry"
                value={data.senderCountry}
                onChange={handleChange}
              >
                <option value="">Tara</option>
                <option value="AF">Afganistan</option>
                <option value="AX">Insulele Aland</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">Samoa Americană</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua si Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaidjan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Bielorusia</option>
                <option value="BE">Belgia</option>
                <option value="BZ">Belize</option>
                <option value="BO">Bolivia</option>
                <option value="BQ">Bonaire, Sint Eustatius și Saba</option>
                <option value="BA">Bosnia si Hertegovina</option>
                <option value="BW">Botswana</option>
                <option value="BV">Insula Bouvet</option>
                <option value="BR">Brazilia</option>
                <option value="IO">
                  Teritoriul Britanic al Oceanului Indian
                </option>
                <option value="BN">Brunei Darussalam</option>
                <option value="BG">Bulgaria</option>
                <option value="CM">Camerun</option>
                <option value="CA">Canada</option>
                <option value="CV">capul Verde</option>
                <option value="KY">Insulele Cayman</option>
                <option value="CF">Republica Centrafricană</option>
                <option value="TD">Ciad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Insula Craciunului</option>
                <option value="CC">Insulele Cocos (Keeling)</option>
                <option value="CO">Columbia</option>
                <option value="CG">Congo</option>
                <option value="CD">Congo, Republica Democrată Congo</option>
                <option value="CK">Insulele Cook</option>
                <option value="CR">Costa Rica</option>
                <option value="CI">Coasta de Fildeș</option>
                <option value="HR">Croaţia</option>
                <option value="CU">Cuba</option>
                <option value="CW">Curacao</option>
                <option value="CY">Cipru</option>
                <option value="CZ">Republica Cehă</option>
                <option value="DK">Danemarca</option>
                <option value="DO">Republica Dominicana</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egipt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Guineea Ecuatorială</option>
                <option value="ER">Eritreea</option>
                <option value="EE">Estonia</option>
                <option value="ET">Etiopia</option>
                <option value="FI">Finlanda</option>
                <option value="FR">Franţa</option>
                <option value="GF">Guyana Franceză</option>
                <option value="PF">Polinezia Franceză</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germania</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GR">Grecia</option>
                <option value="GL">Groenlanda</option>
                <option value="GD">Grenada</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guineea</option>
                <option value="GW">Guineea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HM">Insula Heard și Insulele McDonald</option>
                <option value="VA">Sfântul Scaun (Statul Vatican)</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong</option>
                <option value="HU">Ungaria</option>
                <option value="IS">Islanda</option>
                <option value="IN">India</option>
                <option value="ID">Indonezia</option>
                <option value="IR">Iran (Republica Islamica a</option>
                <option value="IQ">Irak</option>
                <option value="IE">Irlanda</option>
                <option value="IM">insula Barbatului</option>
                <option value="IL">Israel</option>
                <option value="IT">Italia</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japonia</option>
                <option value="JE">Jersey</option>
                <option value="JO">Iordania</option>
                <option value="KZ">Kazahstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="KP">
                  Coreea, Republica Populară Democrată din
                </option>
                <option value="KR">Republica Coreea</option>
                <option value="XK">Kosovo</option>
                <option value="KW">Kuweit</option>
                <option value="KG">Kârgâzstan</option>
                <option value="LA">Republica Populară Democrată Laos</option>
                <option value="LV">Letonia</option>
                <option value="LB">Liban</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Jamahiriya arabă libiană</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lituania</option>
                <option value="LU">Luxemburg</option>
                <option value="MO">Macao</option>
                <option value="MK">
                  Macedonia, Fosta Republică Iugoslavă a
                </option>
                <option value="MG">Madagascar</option>
                <option value="MY">Malaezia</option>
                <option value="MV">Maldive</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MQ">Martinica</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexic</option>
                <option value="FM">Micronezia, Statele Federate ale</option>
                <option value="MD">Moldova, Republica</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Muntenegru</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Maroc</option>
                <option value="MZ">Mozambic</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Olanda</option>
                <option value="AN">Antilele Olandeze</option>
                <option value="NC">Noua Caledonie</option>
                <option value="NZ">Noua Zeelanda</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NF">Insula Norfolk</option>
                <option value="MP">Insulele Marianelor de Nord</option>
                <option value="NO">Norvegia</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Teritoriul Palestinian, Ocupat</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua Noua Guinee</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Filipine</option>
                <option value="PL">Polonia</option>
                <option value="PT">Portugalia</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="RE">Reuniune</option>
                <option value="RO">România</option>
                <option value="RU">Federația Rusă</option>
                <option value="PM">Saint Pierre și Miquelon</option>
                <option value="VC">Sfântul Vincent și Grenadine</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="SA">Arabia Saudită</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="CS">Serbia și Muntenegru</option>
                <option value="SG">Singapore</option>
                <option value="SX">Sf. Martin</option>
                <option value="SK">Slovacia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Insulele Solomon</option>
                <option value="SO">Somalia</option>
                <option value="ZA">Africa de Sud</option>
                <option value="GS">
                  Georgia de Sud și Insulele Sandwich de Sud
                </option>
                <option value="SS">Sudul Sudanului</option>
                <option value="ES">Spania</option>
                <option value="LK">Sri Lanka</option>
                <option value="SD">Sudan</option>
                <option value="SR">Surinam</option>
                <option value="SZ">Swaziland</option>
                <option value="SE">Suedia</option>
                <option value="CH">Elveţia</option>
                <option value="SY">Republica Araba Siriana</option>
                <option value="TW">Taiwan, provincia Chinei</option>
                <option value="TJ">Tadjikistan</option>
                <option value="TZ">Tanzania, Republica Unită a</option>
                <option value="TH">Tailanda</option>
                <option value="TN">Tunisia</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ucraina</option>
                <option value="AE">Emiratele Arabe Unite</option>
                <option value="GB">Regatul Unit</option>
                <option value="US">Statele Unite</option>
                <option value="UM">
                  Insulele Periferice Minore ale Statelor Unite
                </option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VE">Venezuela</option>
                <option value="VN">Vietnam</option>
              </select>
            </div>
            <label className="label-left">
              <input
                type="checkbox"
                name="anonymous"
                checked={data.anonymous}
                onChange={handleChange}
              />
              Surpriză anonimă
            </label>
          </div>
        </div>
      </div>
      <div className="inherit-width">
        <h2 htmlFor="surpriseReason">Care este motivul surprizei?</h2>

        <select
          id="surpriseReason"
          name="surpriseReason"
          value={data.surpriseReason}
          onChange={handleChange}
          required
        >
          <option value=""></option>
          <option value="birthday">Zi de nastere</option>
          <option value="mothersday">8 Martie - ziua femeilor</option>
          <option value="childrensday">1 Iunie - ziua copiilor</option>
          <option value="relationship-aniversary">Ziua aniversară a relației</option>
          <option value="wedding-aniversary">Ziua aniversara a casatoriei</option>
          <option value="wedding">Casatorie</option>
          <option value="christening">Botez</option>
          <option value="job-promovation">Promovare la locul de munca</option>
          <option value="other">Altul</option>
        </select>
      </div>
    </div>
  );
};

export default FormPeople;
