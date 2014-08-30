
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel_MagazineForm = function(paper){
    this._paper = paper;
    this.getMagazineFromPaper = function(paper){
        var magazine = new Srims.papers.Magazine({});
        magazine.set('shortName', paper.get('shortName'));
        magazine.set('issn', paper.get('issn'));
        magazine.set('subjectClass', paper.get('subjectClass'));
        magazine.set('subjectRank', paper.get('subjectRank'));
        magazine.set('publishType', paper.get('publishType'));
        magazine.set('language', paper.get('language'));
        return magazine;
    }
    this._paperMagazine = this.getMagazineFromPaper(this._paper);
    return new Srims.papers.MagazineShowPanel_BasicForm(this._paperMagazine, true);
}
