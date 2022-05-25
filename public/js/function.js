  const DOMstrings = {
    stepsBtnClass: 'multisteps-form__progress-btn',
    stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
    stepsBar: document.querySelector('.multisteps-form__progress'),
    stepsForm: document.querySelector('.multisteps-form__form'),
    stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
    stepFormPanelClass: 'multisteps-form__panel',
    stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
    stepPrevBtnClass: 'js-btn-prev',
    stepNextBtnClass: 'js-btn-next',
    firstStepInputs: document.querySelectorAll(".first-step-input"),
    secondStepInputs: document.querySelectorAll(".second-step-input"),
    thirdStepInputs: document.querySelectorAll(".third-step-input"),
    fourStepBrokerInputs: document.querySelectorAll(".four-step-broker-input"),
    fourStepInputs: document.querySelectorAll(".four-step-input"),
    fiveStepInputs: document.querySelectorAll(".five-step-input"),
  };
  
  
  const removeClasses = (elemSet, className) => {
  
    elemSet.forEach(elem => {
  
      elem.classList.remove(className);
  
    });
  
  };
  
  const findParent = (elem, parentClass) => {
  
    let currentNode = elem;
  
    while (!currentNode.classList.contains(parentClass)) {
      currentNode = currentNode.parentNode;
    }
  
    return currentNode;
  
  };
  
  const getActiveStep = elem => {
    return Array.from(DOMstrings.stepsBtns).indexOf(elem);
  };
  
  const setActiveStep = activeStepNum => {
  
    removeClasses(DOMstrings.stepsBtns, 'js-active');
  
    DOMstrings.stepsBtns.forEach((elem, index) => {
  
      if (index <= activeStepNum) {
        elem.classList.add('js-active');
      }
  
    });
  };
  
  const getActivePanel = () => {
  
    let activePanel;
  
    DOMstrings.stepFormPanels.forEach(elem => {
  
      if (elem.classList.contains('js-active')) {
  
        activePanel = elem;
  
      }
  
    });
  
    return activePanel;
  
  };
  
  const setActivePanel = activePanelNum => {
  
    removeClasses(DOMstrings.stepFormPanels, 'js-active');
  
    DOMstrings.stepFormPanels.forEach((elem, index) => {
      if (index === activePanelNum) {
  
        elem.classList.add('js-active');
  
        setFormHeight(elem);
  
      }
    });
  
  };
  
  const formHeight = activePanel => {
  
    const activePanelHeight = activePanel.offsetHeight;
  
    DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
  
  };
  
  const setFormHeight = () => {
    const activePanel = getActivePanel();
  
    formHeight(activePanel);
  };
  
  /* DOMstrings.stepsBar.addEventListener('click', e => {
  
    const eventTarget = e.target;
  
    if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
      return;
    }
  
    const activeStep = getActiveStep(eventTarget);
  
    setActiveStep(activeStep);
  
    setActivePanel(activeStep);
  }); */
  
  DOMstrings.stepsForm.addEventListener('click', e => {
  
    const eventTarget = e.target;
  
    if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)))
    {
      return;
    }
  
    const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);
  
    let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);
  
    if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {

      activePanelNum--;
  
    } else {
      
      switch (activePanelNum) {
        case 0:
            (DOMstrings.firstStepInputs).forEach((input) => {
              if (input.classList.contains('first-step-other')){
                if (document.querySelector('.other-loan-type').value.length!=0){
                  activePanelNum++;
                }
              }else{
                if (input.checked == true){
                  activePanelNum++;
                }
              }
            });
            
        break;
        case 1:

          (DOMstrings.secondStepInputs).forEach((input) => {
            if (input.classList.contains('second-step-other')){
              if (document.querySelector('.other-property-type').value.length!=0){
                activePanelNum++;
              }
            }else{
              if (input.checked == true){
                activePanelNum++;
              }
            }
          });
          

        break;

        case 2:
          let inputs = (DOMstrings.thirdStepInputs);
          let able = true;

          for (let i = 0; i<inputs.length; i++ ){
            if (inputs[i].value.length == 0){
              able=false;
            }
          }
          
          if (able){
            activePanelNum++;
          } 
        break;

        case 3:

          let yesBrokerWork = document.getElementById('yesbrokerwork');
          let inputsBroker = (DOMstrings.fourStepBrokerInputs);
          let fStepsInputs = (DOMstrings.fourStepInputs);

          let ableBroker = true;
          let fAble = true;
          
          if (yesBrokerWork.checked){
            for (let i = 0; i<fStepsInputs.length; i++ ){
              if (fStepsInputs[i].value.length == 0){
                fAble=false;
              }
            }
            for (let i = 0; i<inputsBroker.length; i++ ){
              if (inputsBroker[i].value.length == 0){
                fAble=false;
              }
            }
            
          }else{
            for (let i = 0; i<fStepsInputs.length; i++ ){
              if (fStepsInputs[i].value.length == 0){
                fAble=false;
              }
            }
          }

          if (fAble){
            activePanelNum++;
          }

        break;

        case 4:
          let count4 = 0;

          (DOMstrings.fiveStepInputs).forEach(input => {
            if (input.value.length>0){
              count4 ++
            }
          });

          if (count4 == DOMstrings.fiveStepInputs.length){
            activePanelNum++;
          } 
        break;
        }
    }
  
    setActiveStep(activePanelNum);
    setActivePanel(activePanelNum);
  
  });
  
  window.addEventListener('load', setFormHeight, false);
  window.addEventListener('resize', setFormHeight, false);