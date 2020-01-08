package at.fhv.shoppingtwist.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.fhv.shoppingtwist.web.rest.TestUtil;

public class ShopperTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Shopper.class);
        Shopper shopper1 = new Shopper();
        shopper1.setId(1L);
        Shopper shopper2 = new Shopper();
        shopper2.setId(shopper1.getId());
        assertThat(shopper1).isEqualTo(shopper2);
        shopper2.setId(2L);
        assertThat(shopper1).isNotEqualTo(shopper2);
        shopper1.setId(null);
        assertThat(shopper1).isNotEqualTo(shopper2);
    }
}
