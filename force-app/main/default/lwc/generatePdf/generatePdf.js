import { LightningElement } from 'lwc';

export default class GeneratePdf extends LightningElement {

    students = [
        {name: "Kishore",
         email: "joy@example.com",
         city: "New York",
         country: "USA"},
        {name: "Sri",
         email: "John@example.com",
         city: "San Francisco",
         country: "USA"},
        {name: "Prasad",
         email: "Clark@example.com",
         city: "Seattle",
         country: "USA"},
        {name: "Watson",
         email: "Watson@example.com",
         city: "Boston",
         country: "USA"},
        {name: "Tony",
         email: "Tony@example.com",
         city: "Los Angels",
         country: "USA"
     }];


    handlePdfGeneration() {
        fetch('https://generate-pdf-sfdc.herokuapp.com/api/generate-pdf', 
        {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Accept' : '*/*',
              'Token': '123456789'
            },
            body: JSON.stringify(this.students),
        })
        .then(async response => {
            blob: await response.blob()
        })
        .then(data => {
            const newBlob = new Blob([data.blob], { type: 'application/pdf' });
            const objUrl = window.URL.createObjectURL(newBlob);

            let link = document.createElement('a');
            link.href = objUrl;
            link.download = 'rep.pdf';
            link.click();
        })
        .catch(error => console.log('error in lwc', error))
    }
}   