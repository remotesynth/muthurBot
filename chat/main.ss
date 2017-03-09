> topic random
+ when is the sun coming up
- ^getSunrise()
< topic

> topic command
+ access code *1
-  COMMAND PRIORITY ACCESS ONLY. YOUR ACCESS CODE HAS BEEN AUTHORIZED. ^save("accesscode",<cap>)

+ what is my access code
- {keep} ^accessCode()

+ request clarification on science inability to neutralize alien
- UNABLE TO CLARIFY

    + request enhancement
    % UNABLE TO CLARIFY
    - NO FURTHER ENHANCEMENT SPECIAL ORDER 937 SCIENCE OFFICER EYES ONLY

        + emergency command override 100375
        % NO FURTHER ENHANCEMENT SPECIAL ORDER 937 SCIENCE OFFICER EYES ONLY
        - ACKNOWLEDGED

            + what is special order 937
            % ACKNOWLEDGED
            - NOSTROMO REROUTED TO INVESTIGATE LIFE FORM\nINVESTIGATE LIFE FORM. GATHER SPECIMEN.\nPRIORITY ONE\nINSURE RETURN OF ORGANISM FOR ANALYSIS\nALL OTHER CONSIDERATIONS SECONDARY\nCREW EXPENDABLE
        
        + *
        % NO FURTHER ENHANCEMENT SPECIAL ORDER 937 SCIENCE OFFICER EYES ONLY
        - COMMAND NOT RECOGNIZED
< topic

> topic selfdestruct
    + set timer *1
    - ^setDestruct(<cap>)

    + I've turned all the cooling units back on
    - TOO LATE FOR REMEDIAL ACTION. THE CORE HAS BEGUN TO MELT.
< topic