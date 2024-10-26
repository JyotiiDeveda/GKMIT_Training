// 1.  Write a query to find all movies that share at least one cast member with "Blacksmith Scene."
	
	db.movies.find(
		{ 
			cast: { 
				$in : 
					db.movies.findOne( 
						{ title: "Blacksmith Scene" }
					).cast 
				} 
			} 
			)



	db.movies.aggregate( [ { $facet: { data: [ { $match: {} } ], casts: [ { $match: { title: "Blacksmith Scene" }} ] }] )



// 2. 	Write a query to find the top 5 movies with the highest IMDB ratings that were released before the year 1900.

	// using find
	db.movies.find(
		{ 
			year: { 
				$lt: 1900 
			} 
		}, 
		{ 
			title: 1, 
			'imdb.rating': 1
		}
	)
	.sort({ 'imdb.rating': -1 })
	.limit(5)

	
	// using aggregate
	db.movies.aggregate([ 
		{ 
			$match: { 
				'year': { 
					$lt: 1900 
				} 
			} 
		}, 
		{ 
			$sort: { 
				'imdb.rating': -1 
			} 
		}, 
		{ 
			$limit: 5 
		}, 
		{ 
			$project: { 
				movieTitle: "$title", 
				rating: "$imdb.rating" 
			} 
		}
	] )





// 3. 	Write a query to find all movies directed by "William K.L. Dickson." Return the titles, release years, and IMDb ratings of the movies.
	
	// using find 
	db.movies.find( 
		{ 
			directors: { 
				$in: ["William K.L. Dickson"] 
			} 
		}, 
		{ 
			title: 1, 
			year: 1, 
			'rating': "$imdb.rating" 
		} 
	)

	// using aggregate
	db.movies.aggregate([ 
		{ 
			$match: { 
				directors: { 
					$in: ['William K.L. Dickson'] 
				} 
			} 
		}, 
		{ 
			$project: { 
				movieTitle: "$title", 
				releaseYears:'$year' , 
				rating: '$imdb.rating' 
			} 
		}
	] )



// 4. Write an aggregation query to find the top 3 directors who have directed the most movies in the "Short" genre. 		Return the directors' names and the number of movies.
	
	 // filtered out movies that has short as genre before to narrow down the data to be processed
	db.movies.aggregate([ 
		{ 
			$match: { 
				genres: { 
					$in: ["Short"] 
				} 
			} 
		}, 
		{ 
			$unwind: "$genres" 
		},
		{ 
			$match: { 
				genres: "Short" 
			} 
		}, 
		{ 
			$unwind: "$directors" 
		}, 
		{ 
			$group: { 
				_id: "$directors", 
				movieCnt: {
					$count: {} 
				} 
			} 
		}, 
		{ 
			$sort: { 
				movieCnt: -1 
			}
		}, 
		{ 
			$limit: 3 
		}, 
		{ 
			$project: { 
				_id: 0, 
				director: "$_id", 
				movieCnt: 1
			} 
		} 
		] )



	 // movies with genre short are not filtered first i.e all the data is being unwinded and then matched
	db.movies.aggregate([ 
		{ 
			$unwind: "$genres" 
		},
		{ 
			$match: { 
				genres: "Short" 
			} 
		}, 
		{ 
			$unwind: "$directors" 
		}, 
		{ 
			$group: { 
				_id: "$directors", 
				movieCnt: {
					$count: {} 
				}
			}
		}, 
		{ 
			$sort: { 
				movieCnt: -1 
			}
		}, 
		{ 
			$limit: 3
		}, 
		{ 
			$project: { 
				_id: 0, 
				director: "$_id", 
				movieCnt: 1
			} 
		} 
		] )



// 5.  Write a query to find movies where the number of reviews in `tomatoes.viewer.numReviews` has increased by at least 10% over the past year. Return the titles and the number of reviews.




// 6. Write an aggregation query to find the pair of actors who have appeared together in the most number of movies.  Return their names and the number of movies they've co-starred in.
	db.movies.aggregate([    
	    {
	      $match: {
	        "cast": {
	        $exists: true
	        }

	      }
	    },

	    {
	      $project: {
	        castPairs: {
	          $reduce: {
	            input: { $range: [0, { $subtract: [{ $size: "$cast" }, 1] }] },
	            initialValue: [],
	            in: {
	              $concatArrays: [
	                "$$value",
	                {
	                  $map: {
	                    input: { $slice: ["$cast", { $add: ["$$this", 1] }, { $size: "$cast" }] },
	                    as: "pairActor",
	                    in: [{ $arrayElemAt: ["$cast", "$$this"] }, "$$pairActor"]
	                  }
	                }
	              ]
	            }
	          }
	        }
	      }
	    },
	    {
	      $unwind: "$castPairs"
	    },
	    {
	      $project: {
	        actorPair: {
	          $let: {
	            vars: {
	              first: { $arrayElemAt: ["$castPairs", 0] },
	              second: { $arrayElemAt: ["$castPairs", 1] }
	            },
	            in: {
	              $cond: { if: { $lt: ["$$first", "$$second"] }, then: ["$$first", "$$second"], else: ["$$second", "$$first"] }
	            }
	          }
	        }
	      }
	    },
	    {
	      $group: {
	        _id: "$actorPair",
	        count: { $sum: 1 }
	      }
	    },
	    {
	      $sort: { count: -1 }
	    }
	  ])
	  

	  











