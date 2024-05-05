function prepareDataForSending( type, object ) {
    switch (type) {
        case "activity":
            return {
                "name": object.name,
                "date": object.date,
                "address": object.address,
                "town": object.town,
                "association": object.association,
                "info": object.info,
                "volunteers": []
            };
        case "volunteer":
            return {
                "name": object.name,
                "town": object.town,
                "image": object.image,
                "association": object.association,
                "contact_number": object.contact_number,
                "jobs": object.jobs,
                "grades": [],
                "average_grade": "",
                "grade_count": "",
                "comments": [{}]
            };
        default:
            return {};
    }
}

export default prepareDataForSending;