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
  EDIT_SCORE(state, { score, scoreId }) {
    const target = state.scores.find((element) => element.scoreId == scoreId);

    target.score = score.score;
    target.isCompleted = score.isCompleted;
  },
  DELETE_SCORE(state, scoreId) {
    const target = state.scores.findIndex(
      (element) => element.scoreId == scoreId
    );

    state.scores.splice(target, 1);
  },
};

export const actions = {
  async createScore({ commit }, score) {
    try {
      const response = await scoreServices.createScore(score);
      commit("ADD_SCORE", response.data.newScore);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getAllScores({ commit }, queryString) {
    try {
      let response;
      if (queryString) {
        queryString = `?${queryString}`;
        response = await scoreServices.getAllScores(queryString);
      } else response = await scoreServices.getAllScores(queryString);
      commit("SET_SCORES", response.data.scores);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getScoresInExam({ commit }, scoreId) {
    try {
      const response = await scoreServices.getScoresInScore(scoreId);

      commit("SET_SCORES_IN_EXAM", response.data.getScores);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getScore({ commit, getters }, score) {
    try {
      const { subjectId, scoreId } = score;

      const target = getters.getByScoreId(subjectId);

      if (target) {
        commit("SET_SCORE", target);
        return target;
      }

      const response = await scoreServices.getScore(subjectId, scoreId);
      commit("SET_SCORE", response.data.score);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async editScore({ commit }, { examLogId, ...score }) {
    try {
      const { scoreId } = score;
      const response = await scoreServices.updateScore(examLogId, score);
      commit("examination/DELETE_EXAM_LOGS", examLogId, {
        root: true,
      });
      commit("EDIT_SCORE", { score: response.data.score, scoreId });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteScore({ commit }, scoreId) {
    try {
      await scoreServices.deleteScore(scoreId);
      commit("DELETE_SCORE");
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export const getters = {
  getByScoreId: (state) => (scoreId) => {
    if (scoreId == state.score.scoreId) return state.score;

    return state.scores.find((score) => score.scoreId == scoreId);
  },
};
