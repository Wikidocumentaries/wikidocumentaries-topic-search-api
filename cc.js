const axios = require('axios');
// const turf = require('@turf/turf');
const BASE_URL = "https://api.creativecommons.engineering";

module.exports = {
    async getImagesCC(topic) {
        const requestConfig = {
            baseURL: BASE_URL + "/",
            url: "image/search/",
            method: "get",
            params: {
                format: 'json',
                q: topic,
                provider: ['nypl', 'met', 'rijksmuseum', 'brooklynmuseum', 'digitaltmuseum', 'sciencemuseum', 'clevelandmuseum', 'thorvaldsensmuseum', 'museumsvictoria', 'geographorguk'],
                lt: 'all',
                page: 1,
                pagesize: 30,
                filter_dead: true
            }
        }
        const response = await axios.request(requestConfig);

        let images = [];

        if (!response.data.results) {
            return [];
        }

        //format response
        for (var i = 0; i < response.data.results.length; i++) {
            var result = response.data.results[i];
            var image = {
                id: result.id,
                // inventoryNumber: result.identifierString,
                source: result.provider,
                title: result.title,
                // geoLocations: result.geolocations,
                // measurements: result.measurements,
                imageURL: result.url,
                thumbURL: result.thumbnail,
                download_url: result.detail,
                // formats: formats,
                // year: result.year,
                // publisher: result.publisher,
                creators: result.creator,
                creator_urls: result.creator_url,
                institutions: result.source,
                // actors: result.subjectActors,
                subjects: result.tags,
                legacy_tags: result.legacy_tags,
                // places: result.subjectPlaces,
                // collection: collection,
                license: result.license,
                license_version: result.license_version,
                // description: result.summary,
                infoURL: result.foreign_landing_url
                // inscriptions: result.inscriptions,
                // datecreated: datecreated
            }

            //console.log(image);

            images.push(image);
        }
        return images;
    }
};