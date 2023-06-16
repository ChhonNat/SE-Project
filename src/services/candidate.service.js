import { API_URL } from "../constants/api_url";
import { httpService } from "./http.service";

const createCandidate = (data, contentType) => {
    return httpService._post(API_URL.candidate.create, data, contentType );
};

const updateCandidate = (data,id, contentType) => {
    return httpService._put(API_URL.candidate.update+id, data, contentType);
}

const inviteCandidate = (data,id, contentType) => {
    return httpService._put(API_URL.candidate.invite+id+'/invite', data, contentType);
}

const accessmentCandidate = (data,intId, canId, contentType) => {
    return httpService._put(API_URL.candidate.accessment+intId+'/candidate/'+canId, data, contentType);
}

export const CandidateService = {
    createCandidate,
    updateCandidate,
    inviteCandidate,
    accessmentCandidate
};