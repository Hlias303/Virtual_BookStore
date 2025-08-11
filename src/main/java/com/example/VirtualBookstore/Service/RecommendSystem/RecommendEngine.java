package com.example.VirtualBookstore.Service.RecommendSystem;

import com.example.VirtualBookstore.Model.Books;
import com.example.VirtualBookstore.Model.UserBook;
import com.example.VirtualBookstore.Repo.BookRepo;
import com.example.VirtualBookstore.Repo.UserBookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RecommendEngine {

    @Autowired
    private Item_BasedCF slopeOne;
    @Autowired
    private BookRepo bookRepo;
    @Autowired
    private UserBookRepo userBookRepo;


    public List<Books> getRecommendationsForUser(int userId, int limit) {
        // Step 1: Build prediction model
        List<UserBook> allUserBooks = userBookRepo.findAll();
        slopeOne.BuildDiffAndFreqMatrices(allUserBooks);
        slopeOne.SimilarityScores();

        // Step 2: Get all predictions
        Map<Integer, Map<Integer, Double>> allPredictions = slopeOne.Predictions();

        // Step 3: Get current user's predictions
      Map<Integer, Double> predictedRatings = allPredictions.get(userId);
//        if (predictedRatings == null) {
//            return Collections.emptyList();
//        }

        // ✅ Step 4: Get books already rated by the user
        List<UserBook> userBooks = userBookRepo.findByUserId(userId);
        Set<Integer> ratedBookIds = userBooks.stream()
                .map(userBook -> userBook.getBook().getId())
                .collect(Collectors.toSet());

        // ✅ Step 5: Filter, sort, and limit recommendations
        List<Integer> recommendedBookIds = predictedRatings.entrySet().stream()
                .filter(entry -> !ratedBookIds.contains(entry.getKey()))
                .sorted(Map.Entry.<Integer, Double>comparingByValue().reversed())
                .limit(limit)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // ✅ Step 6: Fetch recommended books
        return bookRepo.findByIdIn(recommendedBookIds);
    }
}
