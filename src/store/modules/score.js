import scoreServices from "../../api/services/score";

export const namespaced = true;

export const state = {
  scores: [],
  score: {},
  scoresInExam: [],
};

export const mutations = {
  SET_SCORES(state, scores) {
    state.scores = scores;
  },
  SET_SCORES_IN_EXAM(state, scores) {
    state.scoresInExam = scores;
  },
  SET_SCORE(state, score) {
    state.score = score;
  },
  ADD_SCORE(state, score) {
    state.scores.unshift(score);
  },
  EDIT_SCORE(state, score) {
    const target = state.scores.findIndex(
      (element) => element.scoreId === score.scoreId
    );

    state.scores.splice(target, 1, score);
  },
  DELETE_SCORE(state, scoreId) {
    const target = state.scores.findIndex(
      (element) => element.scoreId === scoreId
    );

    state.scores.splice(target, 1);
  },
};

export const actions = {
  async createScore({ commit }, score) {
    const response = await examServices.createScore(score);
    commit("ADD_SCORE", response.data.newScore);
  },
  async getAllScores({ commit }, queryString) {
    if (Object.keys(queryString).length !== 0) queryString = `?${queryString}`;

    const response = await examServices.getAllScores(queryString);

    commit("SET_SCORES", response.data.scores);
  },
  async getScoresInExam({ commit }, examId) {
    const response = await examServices.getScoresInScore(examId);

    commit("SET_SCORES_IN_EXAM", response.data.getScores);
  },
  async getScore({ commit, getters }, score) {
    const { subjectId, scoreId } = score;

    const target = getters.getByScoreId(subjectId);

    if (target) {
      commit("SET_SCORE", target);
      return target;
    }

    const response = await scoreServices.getScore(subjectId, scoreId);
    commit("SET_SCORE", response.data.score);
  },
  async editScore({ commit }, score) {
    const { subjectId } = score;
    const response = await scoreServices.updateScore(subjectId, score);
    commit("EDIT_SCORE", response.data.updateScore);
  },
  async deleteScore({ commit }, scoreId) {
    const { subjectId } = score;
    await scoreServices.deleteScore(subjectId, scoreId);
    commit("DELETE_SCORE", scoreId);
  },
};

export const getters = {
  getByScoreId: (state) => (scoreId) => {
    if (scoreId == state.score.scoreId) return state.score;

    return state.scores.find((score) => score.scoreId == scoreId);
  },
};
