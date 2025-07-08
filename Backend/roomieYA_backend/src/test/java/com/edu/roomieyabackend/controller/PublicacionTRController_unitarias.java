package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.utils.PublicacionHelper;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class PublicacionHelperTest {

    private PublicacionHelper helper;

    @Before
    public void setUp() {
        helper = new PublicacionHelper();
    }

    @Test
    public void testCalculoNormal() {
        double total = helper.calcularCostoTotal(1000.0, 100.0, 50.0, 20.0);
        assertEquals(970.0, total, 0.01);
    }

    @Test
    public void testSinDescuentoNiExtras() {
        double total = helper.calcularCostoTotal(500.0, 0.0, 0.0, 0.0);
        assertEquals(500.0, total, 0.01);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testValorNegativoLanzaExcepcion() {
        helper.calcularCostoTotal(-200.0, 50.0, 30.0, 10.0);
    }

    @Test
    public void testValoresGrandes() {
        double total = helper.calcularCostoTotal(10000.0, 500.0, 300.0, 200.0);
        assertEquals(10000.0, total, 0.01);
    }
}
