export class Api {

    persons = [
        {
            name: "Igor",
            role: "Team Lead"
        },
        {
            name: "Vitalik",
            role: "Lead Software developer"
        },
        {
            name: "Vlad",
            role: "Software developer"
        },
    ];

    tasks = [
        {
            taskName: 'fix bug on GPS apply card'
        },
        {
            taskName: 'fix bug on GPS apply card 34234234'
        }
    ]

    async getPersons() {
        const response = await new Promise((resolve,reject) =>
            setTimeout(() => resolve(this.persons), 4000)
        );
        return response;
    }

    async getTasks() {
        const response = await new Promise((resolve,reject) =>
            setTimeout(() => resolve(this.tasks), 1500)
        );
        return response;
    }
}