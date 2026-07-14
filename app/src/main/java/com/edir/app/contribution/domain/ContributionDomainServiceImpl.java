package com.edir.app.contribution.domain;

import com.edir.app.contribution.domain.entity.Contribution;
import com.edir.app.contribution.domain.entity.MemberContribution;
import com.edir.app.contribution.domain.exceptions.ContributionIsAlreadyClosed;
import com.edir.app.shared.domain.valueobjects.MemberId;
import com.edir.app.shared.domain.valueobjects.Money;

public class ContributionDomainServiceImpl implements ContributionDomainService {

    public void makePayment(Contribution contribution,
                            MemberContribution memberContribution,
                            Money amount,
                            String receiptNo,
                            MemberId memberId
    ){
        if(contribution.isClosed()){
            throw new ContributionIsAlreadyClosed("The contribution is already closed");
        }

        memberContribution.makePayment(amount,receiptNo,memberId,"reason");
    }
}
