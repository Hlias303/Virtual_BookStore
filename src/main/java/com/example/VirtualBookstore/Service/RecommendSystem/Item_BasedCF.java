package com.example.VirtualBookstore.Service.RecommendSystem;

import com.example.VirtualBookstore.Model.Books;
import com.example.VirtualBookstore.Model.User;
import com.example.VirtualBookstore.Model.UserBook;
import com.example.VirtualBookstore.Repo.BookRepo;
import com.example.VirtualBookstore.Repo.UserBookRepo;
import com.example.VirtualBookstore.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class Item_BasedCF {
    @Autowired
    UserBookRepo userBookRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    BookRepo bookRepo;



    //List<UserBook> userBooks;
    private Map<Integer, Map<Integer, Double>> userBookMap = new HashMap<>();
    private Map<Integer, Map<Integer, Double>> diff = new HashMap<>();
    private Map<Integer, Map<Integer, Integer>> freq = new HashMap<>();



    public Map<Integer, Map<Integer, Double>> getElementsFromDB(List<UserBook> userBooks) {
        //userBooks = userBookRepo.findAll();

        for (UserBook userBook : userBooks) {
            userBookMap
                    .computeIfAbsent(userBook.getUser().getId(), k -> new HashMap<>())
                    .put(userBook.getBook().getId(), userBook.getSentiment());
        }

        return userBookMap;
    }

    public void BuildDiffAndFreqMatrices(List<UserBook> userBooks) {
        userBooks = userBookRepo.findAll();
        Map<Integer, Map<Integer, Double>> userBookMap = getElementsFromDB(userBooks);

        for (Map<Integer, Double> user : userBookMap.values()) {
            for (Map.Entry<Integer, Double> entry : user.entrySet()) {
                if (!diff.containsKey(entry.getKey())) {
                    diff.put(entry.getKey(), new HashMap<>());
                    freq.put(entry.getKey(), new HashMap<>());
                }
                for (Map.Entry<Integer, Double> entry2 : user.entrySet()) {
                    int oldCount = 0;
                    if (freq.get(entry.getKey()).containsKey(entry2.getKey())) {
                        oldCount = freq.get(entry.getKey()).get(entry2.getKey());
                    }
                    double oldDiff = 0;
                    if (diff.get(entry.getKey()).containsKey(entry2.getKey())) {
                        oldDiff = diff.get(entry.getKey()).get(entry2.getKey());
                    }
                    double observedDiff = entry.getValue() - entry2.getValue();
                    freq.get(entry.getKey()).put(entry2.getKey(), oldCount + 1);
                    diff.get(entry.getKey()).put(entry2.getKey(), oldDiff + observedDiff);
                }
            }
        }

    }

    public void SimilarityScores() {
        for (Integer book1 : diff.keySet()) {
            for (Integer book2 : diff.get(book1).keySet()) {
                double oldValue = diff.get(book1).get(book2).doubleValue();
                int count = freq.get(book1).get(book2).intValue();
                diff.get(book1).put(book2, oldValue / count);
            }
        }
    }

    public Map<Integer, Map<Integer, Double>> Predictions() {
        Map<Integer, Map<Integer, Double>> predictions = new HashMap<>();
        List<Integer> BooksId = userBookRepo.findAllBookIds();
        Set<Integer> BooksIdSet = new HashSet<>(BooksId);

        // Step 1: Collect all rated books
        Set<Integer> ratedBookIds = new HashSet<>();
        for (Map<Integer, Double> ratings : userBookMap.values()) {
            ratedBookIds.addAll(ratings.keySet());
        }

        for (Map.Entry<Integer, Map<Integer, Double>> entry : userBookMap.entrySet()) {
            int userId = entry.getKey();
            Map<Integer, Double> userRatings = entry.getValue();

            Map<Integer, Double> uPred = new HashMap<>();
            Map<Integer, Integer> uFreq = new HashMap<>();

            for (Integer j : ratedBookIds) {
                if (!userRatings.containsKey(j)) continue;

                for (Integer k : ratedBookIds) {
                    if (j.equals(k)) continue;

                    Double diffVal = (diff.containsKey(k)) ? diff.get(k).get(j) : null;
                    Integer freqVal = (freq.containsKey(k)) ? freq.get(k).get(j) : null;
                    Double userRating = userRatings.get(j);

                    if (diffVal == null || freqVal == null || userRating == null) continue;

                    double predictedValue = diffVal + userRating;
                    double finalValue = predictedValue * freqVal;

                    uPred.put(k, uPred.getOrDefault(k, 0.0) + finalValue);
                    uFreq.put(k, uFreq.getOrDefault(k, 0) + freqVal);
                }
            }

            Map<Integer, Double> clean = new HashMap<>();
            for (Integer bookId : uPred.keySet()) {
                if (uFreq.get(bookId) != null && uFreq.get(bookId) > 0) {
                    clean.put(bookId, uPred.get(bookId) / uFreq.get(bookId));
                }
            }

            // Keep user's existing ratings and add -1.0 for books not rated but valid
            for (Integer j : ratedBookIds) {
                if (userRatings.containsKey(j)) {
                    clean.put(j, userRatings.get(j));
                } else if (!clean.containsKey(j)) {
                    clean.put(j, -1.0);
                }
            }

            predictions.put(userId, clean);
        }

        return predictions;
    }

    public void SavePredictions(){
        Map<Integer, Map<Integer, Double>> predictions = Predictions();
        for (Map.Entry<Integer, Map<Integer, Double>> entry : predictions.entrySet()) {
            int userId = entry.getKey();
            for(Map.Entry<Integer, Double> Bookentry : entry.getValue().entrySet()) {
                int bookId = Bookentry.getKey();
                double rating = Bookentry.getValue();

                if(rating > 0) {
                    UserBook userBook = new UserBook();
                    User user = userRepo.findById(userId).orElse(null);
                    userBook.setUser(user);
                    Books book = bookRepo.findById(bookId).orElse(null);
                    userBook.setBook(book);
                    userBook.setSentiment(rating);
                    userBookRepo.save(userBook);
                }
            }
        }

    }

}


