package Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import model.*;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

public class SquareAndPropertyTest {




    List<Square> squareList = new ArrayList<>();
    Property property;

    public void setSquareList() {
        squareList.add(0, new Go("Go", 1));
        squareList.add(1, new Property("Central", 2, 800, 90,"light blue"));
        squareList.add(2, new Property("Wan Chai", 3, 700, 65,"light blue"));
        squareList.add(3, new IncomeTax("Income Tax", 4));
        squareList.add(4, new Property("Stanley", 5, 600, 60,"light blue"));
        squareList.add(5, new InJailOrJustVisiting("InJailOrJustVisiting", 6));
        squareList.add(6, new Property("Shek O", 7, 400, 60,"red"));
        squareList.add(7, new Property("Mong Kok", 8, 500, 40,"red"));
        squareList.add(8, new Chance("Chance", 9));
        squareList.add(9, new Property("Tsing Yi", 10, 400, 15,"red"));
        squareList.add(10, new FreeParking("FreeParking", 11));
        squareList.add(11, new Property("Shatin", 12, 700, 75,"blue"));
        squareList.add(12, new Chance("Chance", 13));
        squareList.add(13, new Property("Tuen Mun", 14, 400, 20,"blue"));
        squareList.add(14, new Property("Tai Po", 15, 500, 25,"blue"));
        squareList.add(15, new GoToJail("GoToJail", 16));
        squareList.add(16, new Property("Sai Kung", 17, 400, 10,"yellow"));
        squareList.add(17, new Property("Yuen Long", 18, 400, 25,"yellow"));
        squareList.add(18, new Chance("Chance", 9));
        squareList.add(19, new Property("Tai O", 20, 600, 25,"yellow"));

    }


    @Test
    void PropertyCase1(){
        //Test Case: Central
        setSquareList();
        property = (Property) squareList.get(1);
        assertEquals(property.getName(),"Central");
        assertEquals(property.getPrice(),800);
        assertEquals(property.getRent(),90);
        assertEquals(property.getColor(),"light blue");

    }

    @Test
    void PropertyCase2(){
        //Test Case: MongKok
        setSquareList();
        property = (Property) squareList.get(7);
        assertEquals(property.getName(),"Mong Kok");
        assertEquals(property.getPrice(),500);
        assertEquals(property.getRent(),40);
        assertEquals(property.getColor(),"red");

    }

    @Test
    void PropertyCase3(){
        //Test Case: Tai Po
        setSquareList();
        property = (Property) squareList.get(14);
        assertEquals(property.getName(),"Tai Po");
        assertEquals(property.getPrice(),500);
        assertEquals(property.getRent(),25);
        assertEquals(property.getColor(),"blue");

    }

    @Test
    void PropertyCase4(){
        //Test Case: Sai Kung
        setSquareList();
        property = (Property) squareList.get(16);
        assertEquals(property.getName(),"Sai Kung");
        assertEquals(property.getPrice(),400);
        assertEquals(property.getRent(),10);
        assertEquals(property.getColor(),"yellow");

    }

    @Test
    void PropertyCase5(){
        //Test Case: Yuen Long
        setSquareList();
        property = (Property) squareList.get(17);
        assertEquals(property.getName(),"Yuen Long");
        assertEquals(property.getPrice(),400);
        assertEquals(property.getRent(),25);
        assertEquals(property.getColor(),"yellow");

    }


    @Test
    void OtherSquareCase1(){
        setSquareList();
        assertEquals((squareList.get(0).getType()),"Go");

    }

    @Test
    void OtherSquareCase2(){
        setSquareList();
        assertEquals((squareList.get(8).getType()),"Chance");

    }

    @Test
    void OtherSquareCase3(){
        setSquareList();
        assertEquals((squareList.get(15).getType()),"GoToJail");

    }
}
