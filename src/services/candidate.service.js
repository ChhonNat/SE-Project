import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";

const createCandidate = (data, contentType) => {
    return httpService._post(API_URL.candidate.create, data, contentType);
};

const editCandidate = (data, id, contentType) => {
    return httpService._put(API_URL.candidate.edit + id, data, contentType);
}

const suggestScheduleInterview = (id, data, contentType) => {
    return httpService._put(API_URL.candidate.suggestScheduleInterview + id + '/schedule', data, contentType);
}

const editResultCandidate = (data, id, contentType) => {
    return httpService._put(API_URL.candidate.editResult + id, data, contentType);
}

const editAssessmentCandidate = (data, id, contentType) => {
    return httpService._put(API_URL.candidate.editAssessment + id, data, contentType);
}

const hireCandidate = (data, assId, intId, canId, contentType) => {
    return httpService._put(API_URL.candidate.hire + assId + '/interview/' + intId + '/candidate/' + canId, data, contentType);
}

const downloadCVFile = (id) => {
    return httpService._get(API_URL.candidate.downloadCVFile + id);
}


export const candidateService = {
    createCandidate,
    editCandidate,
    suggestScheduleInterview,
    editResultCandidate,
    editAssessmentCandidate,
    hireCandidate,
    downloadCVFile
};