package model;

import java.util.Random;

public class Dice {

	
	int result;
	int roll1;
	int roll2;
	
	//roll the dice
	public int getResult() {

		Random  r = new Random();

		roll1 = r.nextInt(4)+1;
		roll2 = r.nextInt(4)+1;
		result = roll1 + roll2;


		return result;
			
	}



	
	
	
}
