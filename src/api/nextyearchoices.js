/**
 * @returns {Promise<*>}
 */
exports.metadata = async function () {
    const res = await this.api.head("/nextyearchoices");
    const count = this.utils.extractCount(res.headers["content-range"]);

    return {
        maxItemsPerPage: 100,
        count
    };
};

/**
 * @param {String} id
 * @returns {Promise<*>}
 */
exports.exists = async function (id) {
    const res = await this.api.head(`/nextyearchoices/${id}`);
    return res.status === 200;
};

/**
 * @param {Object} nextYearChoice
 * @returns {Promise<*>}
 */
exports.create = async function (nextYearChoice = {}) {
    const res = await this.api.post("/nextyearchoices", nextYearChoice);
    return res.data;
};

/**
 * @param {String} id
 * @returns {Promise<*>}
 */
exports.get = async function (id) {
    const res = await this.api.get(`/nextyearchoices/${id}`);
    return res.data;
};

/**
 * @param {Number} offset
 * @param {Number} limit
 * @returns {Promise<*>}
 */
exports.list = async function (offset = 0, limit = 100) {
    const lastElement = offset + (limit - 1);
    const res = await this.api.get("/nextyearchoices", {
        headers: {
            "Range": `items=${offset}-${lastElement}`
        }
    });

    // XXX extract the total of found resources

    return res.data;
};

/**
 * @param {String} id
 * @param {Object} infos
 * @returns {Promise<*>}
 */
exports.update = async function (id, infos = {}) {
    const res = await this.api.patch(`/nextyearchoices/${id}`, infos);
    return res.status === 200;
};

/**
 * @param {String} id
 * @returns {Promise<*>}
 */
exports.remove = async function (id) {
    const res = await this.api.delete(`/nextyearchoices/${id}`);
    return res.status === 200;
};

/**
 * Make sure that you've identified each of your item with an appropriate identifier
 * stored in a "imported_id" key
 *
 * @param {Array<Object>} values
 * @returns {Promise<*>} Inserted elements will be returned
 */
exports.import = async function (values) {
    const res = await this.api.post("/nextyearchoices/import", values);
    return res.status === 200;
};
