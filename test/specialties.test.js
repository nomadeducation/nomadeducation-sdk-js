const Nomad = require("dist/node");
const account = require("./account");
const faker = require("faker/locale/fr");
const chai = require("chai");
const expect = chai.expect;

describe("Specialty", function () {
    const client = new Nomad();
    let newSpecialty = {};
    const degreeName = `dummy specialty ${faker.random.uuid()}`;

    before(async () => {
        const isConnected = await client.login(account.username, account.password);
        expect(isConnected).to.be.true;
    });

    after(async () => {
        const loggedOut = await client.logout();
        expect(loggedOut).to.be.true;
    });

    it("should create a new specialty", async function () {
        const fakeSpecialty = {
            name: degreeName
        };

        newSpecialty = await client.specialties.create(fakeSpecialty);

        expect(newSpecialty).to.be.an("object").that.include.all.keys(
            "id",
            "created_at"
        );
    });

    it("should test the existence of the new specialty", async function () {
        const doesExists = await client.specialties.exists(newSpecialty.id);

        expect(doesExists).to.be.a("boolean").that.is.true;
    });

    it("should update the created specialty", async function () {
        const fakeInfos = {
            name: `changed ${degreeName}`
        };

        const updated = await client.specialties.update(newSpecialty.id, fakeInfos);

        expect(updated).to.be.a("boolean").that.is.true;
    });

    it("should delete the created specialty", async function () {
        const removed = await client.specialties.remove(newSpecialty.id);

        expect(removed).to.be.a("boolean").that.is.true;
    });

    it("should check that the specialty doesn't exist", async function () {
        const doesExists = await client.specialties.exists(newSpecialty.id);

        expect(doesExists).to.be.a("boolean").that.is.false;
    });
});
