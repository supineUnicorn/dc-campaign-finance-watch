var candidateService = require('./candidate.service');
var _ = require('lodash');

exports.getCandidateById = function(req, res) {
  var candidateId = req.params.id;

  candidateService
    .findCandidate(candidateId)
    .then(function(candidate){
      res.send(candidate);
    });
}

exports.getElectedOfficials = function(req, res) {
  candidateService
    .findElectedCandidates()
    .then(function(officials){
      res.send(officials);
    });
}

exports.searchForCandidate = function(req, res) {
  var search = req.query.search;
  candidateService
    .searchForCandidate(search)
    .then(function(results){
      res.send(_.map(results, function(result){
        return result.toObject({virtuals: true});
      }));
    })
    .catch(function(err){
      console.log(err);
    });
}