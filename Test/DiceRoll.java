package Test;


import static org.junit.jupiter.api.Assertions.assertEquals;

import model.*;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

public class DiceRoll {

    Dice dice;

    @Test
    void diceTest1(){
        dice = new Dice();
        int result = dice.getResult();
        System.out.println("The result is "+result);

    }



}
