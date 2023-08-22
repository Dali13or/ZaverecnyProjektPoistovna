class Zoznam {
    constructor() {
        const zaznamyZeStorage = localStorage.getItem("poistenci");
        this.poistenci = zaznamyZeStorage ? JSON.parse(zaznamyZeStorage) : [];
        for (let i = 0; i < this.poistenci.length; i++) {
            this.poistenci[i] = Object.assign(new Poistenec, this.poistenci[i]);
        }

        this.menoInput = document.getElementById("meno");
        this.priezviskoInput = document.getElementById("priezvisko");
        this.telefonInput = document.getElementById("telefon");
        this.vekInput = document.getElementById("vek")
        this.potvrdButton = document.getElementById("potvrd");
        this.vypisElement = document.getElementById("poistenciZoznam");
        this.pidajPoistenca();
    }

    pidajPoistenca() {
        this.potvrdButton.onclick = () => {
            const poistenec = new Poistenec((this.menoInput.value).charAt(0).toUpperCase() + (this.menoInput.value).slice(1), (this.priezviskoInput.value).toUpperCase(), this.vekInput.value, this.telefonInput.value);
            console.log(this.menoInput.value.length, this.priezviskoInput.value.length);
            if (this.menoInput.value.length !== 0 && this.priezviskoInput.value.length !== 0 && this.vekInput.value !== "" && this.telefonInput.value !== "") {
                this.poistenci.push(poistenec);
                localStorage.setItem("poistenci", JSON.stringify(this.poistenci));
                this.vypisPoistenci();
                this.ulozPoistencov();
            } else {
                alert("!POZOR : Niesú vyplnené všetky údaje!")
            }
        };
    }

    ulozPoistencov() {
        this.menoInput.value = "";
        this.priezviskoInput.value = "";
        this.telefonInput.value = "";
        this.vekInput.value = "";
    }

    vypisPoistenca() {
        this.zoradPoistencov();
        const tableBody = document.getElementById('tabulkaVypis');
        this.vypisElement = "";
        for (const poistenec of this.poistenci) {
            this.vypisElement += `<tr><td>${poistenec.priezvisko}</td><td>${poistenec.meno}</td><td>${poistenec.telefon}</td><td>${poistenec.vek}</td></tr>`;
        }
        tableBody.innerHTML = this.vypisElement;
    }
    zoradPoistencov() {
        this.poistenci.sort((a, b) => {
            if (a.priezvisko < b.priezvisko) return -1;
            if (a.priezvisko > b.priezvisko) return 1;
            return 0;
        });
    }
}

