package com.edir.app.funeral.domain.exceptions;

import com.edir.app.shared.domain.exceptions.DomainException;
import com.edir.app.shared.domain.valueobjects.ItemCode;

public class ReturnedExceedsActualQuantityException extends DomainException {
    public ReturnedExceedsActualQuantityException(ItemCode itemCode) {
        super("Returned quantity exceeds actual quantity for item: " + itemCode.code());
    }
}
